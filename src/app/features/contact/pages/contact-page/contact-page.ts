import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { HeaderComponent } from '../../../../shared/components/app-header/app-header';
import { FooterComponent } from '../../../../shared/components/app-footer/app-footer';

import { StrapiService } from '../../../../core/services/strapi/strapi.service';
import { AuthService } from '../../../../core/services/auth/auth';
import { SolicitudesService } from '../../../../core/services/solicitudes/solicitudes.service';

@Component({
  selector: 'app-contacto-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './contact-page.html',
  styleUrl: './contact-page.css'
})
export class ContactPageComponent implements OnInit {

  programadores: any[] = [];

  nombre = '';
  correo = '';
  descripcion = '';
  programadorSlug = '';

  enviando = false;
  mensajeExito = '';
  mensajeError = '';

  constructor(
    private strapiService: StrapiService,
    private solicitudesService: SolicitudesService,
    private authService: AuthService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    try {
      const response: any =
        await this.strapiService.getProgramadores();

      this.programadores = response.data.filter(
        (programador: any) => programador.activo
      );

      const usuario =
        await this.authService.getCurrentUser();

      this.correo = usuario?.email ?? '';

      this.cd.detectChanges();

    } catch (error) {
      console.error('Error al cargar contacto:', error);

      this.mensajeError =
        'No fue posible cargar los programadores.';

      this.cd.detectChanges();
    }
  }

  async enviarSolicitud() {

    this.mensajeExito = '';
    this.mensajeError = '';

    if (
      !this.nombre.trim() ||
      !this.correo.trim() ||
      !this.descripcion.trim() ||
      !this.programadorSlug
    ) {
      this.mensajeError =
        'Completa todos los campos del formulario.';
      return;
    }

    const usuario =
      await this.authService.getCurrentUser();

    if (!usuario) {
      await this.router.navigate(['/login']);
      return;
    }

    const programadorSeleccionado =
      this.programadores.find(
        programador =>
          programador.slug === this.programadorSlug
      );

    if (!programadorSeleccionado) {
      this.mensajeError =
        'Selecciona un programador válido.';
      return;
    }

    try {
      this.enviando = true;

      await this.solicitudesService.crearSolicitud({
        nombre: this.nombre.trim(),
        correo: this.correo.trim(),
        descripcion: this.descripcion.trim(),
        programadorNombre:
          programadorSeleccionado.nombre,
        programadorSlug:
          programadorSeleccionado.slug,
        uidUsuario: usuario.uid
      });

      this.mensajeExito =
        'Solicitud enviada correctamente.';

      this.nombre = '';
      this.descripcion = '';
      this.programadorSlug = '';

    } catch (error) {
      console.error('Error al enviar solicitud:', error);

      this.mensajeError =
        'No fue posible enviar la solicitud.';

    } finally {
      this.enviando = false;
      this.cd.detectChanges();
    }
  }
}