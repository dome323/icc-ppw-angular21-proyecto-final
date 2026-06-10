import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';

import { HeaderComponent } from '../../../../shared/components/app-header/app-header';
import { FooterComponent } from '../../../../shared/components/app-footer/app-footer';

import { AuthService } from '../../../../core/services/auth/auth';
import { SolicitudesService } from '../../../../core/services/solicitudes/solicitudes.service';

@Component({
  selector: 'app-mis-solicitudes-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslocoModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './mis-solicitudes-page.html',
  styleUrls: ['./mis-solicitudes-page.css']
})
export class MisSolicitudesPageComponent implements OnInit {

  solicitudes: any[] = [];
  notifications: string[] = [];

  cargando = true;
  mensajeError = '';
  totalSolicitudes = 0;
  pendientes = 0;
  respondidas = 0;
  rechazadas = 0;

  constructor(
    private authService: AuthService,
    private solicitudesService: SolicitudesService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private translocoService: TranslocoService
  ) {}

  async ngOnInit() {

    try {

      const usuario =
        await this.authService.getCurrentUser();

      if (!usuario) {
        await this.router.navigate(['/login']);
        return;
      }

      this.solicitudes =
        await this.solicitudesService
          .getSolicitudesPorUsuario(usuario.uid);

      this.totalSolicitudes = this.solicitudes.length;
      this.respondidas = this.solicitudes.filter(solicitud => solicitud.estado === 'respondida').length;
      this.rechazadas = this.solicitudes.filter(solicitud => solicitud.estado === 'rechazada').length;
      this.pendientes = this.totalSolicitudes - this.respondidas - this.rechazadas;

      this.notifications = this.solicitudes
        .filter(solicitud => solicitud.estado === 'respondida')
        .map(solicitud =>
          this.translocoService.translate(
            'misSolicitudes.notifications.responseReady',
            { developer: solicitud.programadorNombre }
          )
        );

    } catch (error) {

      console.error(
        'Error al cargar solicitudes:',
        error
      );

      this.mensajeError =
        this.translocoService.translate('misSolicitudes.messages.errorLoad');

    } finally {

      this.cargando = false;
      this.cd.detectChanges();

    }
  }

  formatearFecha(fecha: any): string {

    if (!fecha) {
      return this.translocoService.translate('misSolicitudes.pendingDate');
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

claseEstado(estado: string): string {

  if (estado === 'respondida') {
    return 'bg-green-500/10 text-green-400 border-green-500/30';
  }

  if (estado === 'rechazada') {
    return 'bg-red-500/10 text-red-400 border-red-500/30';
  }

  return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
}

estadoLabel(estado: string): string {
  if (estado === 'respondida') {
    return this.translocoService.translate('misSolicitudes.status.responded');
  }

  if (estado === 'rechazada') {
    return this.translocoService.translate('misSolicitudes.status.rejected');
  }

  return this.translocoService.translate('misSolicitudes.status.pending');
}
}