import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import {
  Router,
  RouterModule
} from '@angular/router';

import { CommonModule } from '@angular/common';
import { User } from 'firebase/auth';
import { Subscription } from 'rxjs';

import {
  TranslocoModule,
  TranslocoService
} from '@ngneat/transloco';

import { AuthService } from '../../../core/services/auth/auth';
import { StrapiService } from '../../../core/services/strapi/strapi.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslocoModule
  ],
  templateUrl: './app-header.html',
  styleUrl: './app-header.css'
})
export class HeaderComponent implements OnInit, OnDestroy {

  usuarioLogueado: User | null = null;

  esProgramador = false;
  menuAbierto = false;
  activeLang = 'es';

  private authSubscription?: Subscription;

  constructor(
    private authService: AuthService,
    private strapiService: StrapiService,
    private router: Router,
    private translocoService: TranslocoService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.activeLang =
      localStorage.getItem('lang') || 'es';

    this.translocoService.setActiveLang(
      this.activeLang
    );

    this.authSubscription =
      this.authService.currentUser$.subscribe(
        async usuario => {

          this.usuarioLogueado = usuario;
          this.esProgramador = false;

          if (!usuario?.email) {
            this.cd.detectChanges();
            return;
          }

          try {

            const correo =
              usuario.email
                .trim()
                .toLowerCase();

            const response: any =
              await this.strapiService
                .getProgramadorByCorreo(correo);

            console.log(
              'CORREO FIREBASE:',
              correo
            );

            console.log(
              'PROGRAMADOR ENCONTRADO:',
              response.data
            );

            this.esProgramador =
              Array.isArray(response.data) &&
              response.data.length > 0;

          } catch (error) {

            console.error(
              'Error al verificar programador:',
              error
            );

            this.esProgramador = false;

          } finally {

            this.cd.detectChanges();

          }
        }
      );
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }

  setLanguage(lang: string): void {

    this.activeLang = lang;

    localStorage.setItem(
      'lang',
      lang
    );

    this.translocoService.setActiveLang(lang);
  }

  alternarMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }

  cerrarMenu(): void {
    this.menuAbierto = false;
  }

  async onLogout(): Promise<void> {

    try {

      await this.authService.logout();

      this.usuarioLogueado = null;
      this.esProgramador = false;
      this.menuAbierto = false;

      await this.router.navigate(['/']);

    } catch (error) {

      console.error(
        'Error al cerrar sesión:',
        error
      );
    }
  }
}