import {ChangeDetectorRef,Component,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth';
import { StrapiService } from '../../../../core/services/strapi/strapi.service';
import { SolicitudesService } from '../../../../core/services/solicitudes/solicitudes.service';
import { HeaderComponent } from '../../../../shared/components/app-header/app-header';
import { FooterComponent } from '../../../../shared/components/app-footer/app-footer';

@Component({
  selector: 'app-solicitudes-recibidas-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './solicitudes-recibidas-page.html',
  styleUrl: './solicitudes-recibidas-page.css'
})
export class SolicitudesRecibidasPageComponent implements OnInit {

  programador: any = null;
  solicitudes: any[] = [];

  cargando = true;
  mensajeError = '';
  noEsProgramador = false;

  constructor(
    private authService: AuthService,
    private strapiService: StrapiService,
    private solicitudesService: SolicitudesService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  async ngOnInit() {

    try {

      const usuario =
        await this.authService.getCurrentUser();

      if (!usuario?.email) {
        await this.router.navigate(['/login']);
        return;
      }

      const response: any =
        await this.strapiService
          .getProgramadorByCorreo(usuario.email);

      this.programador = response.data[0];

      if (!this.programador) {
        this.noEsProgramador = true;
        return;
      }

      this.solicitudes =
        await this.solicitudesService
          .getSolicitudesRecibidas(
            this.programador.slug
          );

      this.solicitudes.forEach(solicitud => {
        solicitud.respuestaTemporal =
          solicitud.respuesta ?? '';
      });

    } catch (error) {

      console.error(
        'Error al cargar solicitudes recibidas:',
        error
      );

      this.mensajeError =
        'No fue posible cargar las solicitudes recibidas.';

    } finally {

      this.cargando = false;
      this.cd.detectChanges();

    }
  }

  async guardarRespuesta(solicitud: any) {

    if (!solicitud.respuestaTemporal?.trim()) {
      alert('Escribe una respuesta antes de guardar.');
      return;
    }

    try {

      solicitud.guardando = true;

      await this.solicitudesService
        .responderSolicitud(
          solicitud.id,
          solicitud.respuestaTemporal
        );

      solicitud.respuesta =
        solicitud.respuestaTemporal.trim();

      solicitud.estado = 'respondida';

      alert('Respuesta guardada correctamente.');

    } catch (error) {

      console.error(
        'Error al responder solicitud:',
        error
      );

      alert('No fue posible guardar la respuesta.');

    } finally {

      solicitud.guardando = false;
      this.cd.detectChanges();

    }
  }

  formatearFecha(fecha: any): string {

    if (!fecha) {
      return 'Fecha pendiente';
    }

    const fechaJavaScript =
      fecha.toDate
        ? fecha.toDate()
        : new Date(fecha);

    return fechaJavaScript.toLocaleString('es-EC', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  }
}