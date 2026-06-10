import { Component } from '@angular/core';
import {
  FormsModule,
  NgForm
} from '@angular/forms';
import {
  Router,
  RouterModule
} from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../../../../core/services/auth/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  email = '';
  password = '';

  cargando = false;
  formularioEnviado = false;
  mensajeError = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async onLogin(formulario: NgForm) {

    this.formularioEnviado = true;
    this.mensajeError = '';

    if (formulario.invalid) {
      formulario.control.markAllAsTouched();
      return;
    }

    try {

      this.cargando = true;

      await this.authService.login(
        this.email.trim(),
        this.password
      );

      await this.router.navigate(['/']);

    } catch (error: any) {

      console.error(
        'Error al iniciar sesión:',
        error
      );

      this.mensajeError =
        this.obtenerMensajeError(error.code);

    } finally {
      this.cargando = false;
    }
  }

  async onLoginGoogle() {

    this.mensajeError = '';

    try {

      this.cargando = true;

      await this.authService.loginConGoogle();

      await this.router.navigate(['/']);

    } catch (error: any) {

      console.error(
        'Error al iniciar sesión con Google:',
        error
      );

      if (error.code === 'auth/popup-closed-by-user') {
        this.mensajeError =
          'Cerraste la ventana de Google.';
      } else {
        this.mensajeError =
          'No fue posible iniciar sesión con Google.';
      }

    } finally {
      this.cargando = false;
    }
  }

  limpiarError() {
    this.mensajeError = '';
  }

  private obtenerMensajeError(codigo: string): string {

    switch (codigo) {

      case 'auth/invalid-email':
        return 'El correo electrónico no es válido.';

      case 'auth/invalid-credential':
        return 'El correo o la contraseña son incorrectos.';

      case 'auth/user-not-found':
        return 'No existe una cuenta con este correo.';

      case 'auth/wrong-password':
        return 'La contraseña es incorrecta.';

      case 'auth/too-many-requests':
        return 'Demasiados intentos. Intenta nuevamente más tarde.';

      case 'auth/network-request-failed':
        return 'Revisa tu conexión a Internet.';

      default:
        return 'No fue posible iniciar sesión.';
    }
  }
}