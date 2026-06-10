import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from 'firebase/auth';

import { AuthService } from '../../../core/services/auth/auth';
import { StrapiService } from '../../../core/services/strapi/strapi.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './app-header.html',
  styleUrl: './app-header.css'
})
export class HeaderComponent implements OnInit {

  usuarioLogueado: User | null = null;

  esProgramador = false;
  menuAbierto = false;

  constructor(
    private authService: AuthService,
    private strapiService: StrapiService,
    private router: Router
  ) {}

  ngOnInit() {

    this.authService.currentUser$.subscribe(
      async usuario => {

        this.usuarioLogueado = usuario;
        this.esProgramador = false;

        if (usuario?.email) {

          try {

            const response: any =
              await this.strapiService
                .getProgramadorByCorreo(usuario.email);

            this.esProgramador =
              response.data.length > 0;

          } catch (error) {

            console.error(
              'Error al verificar el tipo de usuario:',
              error
            );

            this.esProgramador = false;
          }
        }
      }
    );
  }

  alternarMenu() {
    this.menuAbierto = !this.menuAbierto;
  }

  cerrarMenu() {
    this.menuAbierto = false;
  }

  async onLogout() {

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