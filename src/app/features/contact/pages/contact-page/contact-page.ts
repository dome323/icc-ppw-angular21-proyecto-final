import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { HeaderComponent } from '../../../../shared/components/app-header/app-header';
import { FooterComponent } from '../../../../shared/components/app-footer/app-footer';

import { StrapiService } from '../../../../core/services/strapi/strapi.service';
import { AuthService } from '../../../../core/services/auth/auth';
import { SolicitudesService } from '../../../../core/services/solicitudes/solicitudes.service';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TranslocoModule,
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

  contactEmail = 'contacto@devportfolio.ec';

  whatsappContacts = [
    { slug: 'domenica', nombre: 'Domenica Uyunkar', phone: '593985464222' },
    { slug: 'josue', nombre: 'Josue Valdez', phone: '5930963356625' }
  ];

  selectedWhatsappRecipient = 'domenica';

  constructor(
    private strapiService: StrapiService,
    private solicitudesService: SolicitudesService,
    private authService: AuthService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private translocoService: TranslocoService
  ) {}

  get selectedWhatsappContact() {
    return this.whatsappContacts.find(contact => contact.slug === this.selectedWhatsappRecipient) ?? this.whatsappContacts[0];
  }

  get whatsappLink(): string {
    const message = this.translocoService.translate('contact.whatsappMessage');
    return `https://wa.me/${this.selectedWhatsappContact.phone}?text=${encodeURIComponent(message)}`;
  }

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

      this.mensajeError = this.translocoService.translate('contact.messages.errorLoad');

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
      this.mensajeError = this.translocoService.translate('contact.messages.errorFill');
      return;
    }

    const usuario =
      await this.authService.getCurrentUser();

    if (!usuario) {
      this.mensajeError = this.translocoService.translate('contact.messages.loginRequired');
      await this.router.navigate(['/login']);
      return;
    }

    const programadorSeleccionado =
      this.programadores.find(
        programador =>
          programador.slug === this.programadorSlug
      );

    if (!programadorSeleccionado) {
      this.mensajeError = this.translocoService.translate('contact.messages.errorSelect');
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

      this.mensajeExito = this.translocoService.translate('contact.messages.success');

      this.nombre = '';
      this.descripcion = '';
      this.programadorSlug = '';

    } catch (error) {
      console.error('Error al enviar solicitud:', error);

      this.mensajeError = this.translocoService.translate('contact.messages.errorSend');

    } finally {
      this.enviando = false;
      this.cd.detectChanges();
    }
  }
}