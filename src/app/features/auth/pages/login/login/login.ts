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
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';

import { AuthService } from '../../../../../core/services/auth/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TranslocoModule
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
    private router: Router,
    private translocoService: TranslocoService
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
        this.mensajeError = this.translocoService.translate('auth.login.errorPopupClosed');
      } else {
        this.mensajeError = this.translocoService.translate('auth.login.loginGoogleDefault');
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
        return this.translocoService.translate('auth.errors.invalidEmail');

      case 'auth/invalid-credential':
        return this.translocoService.translate('auth.errors.invalidCredential');

      case 'auth/user-not-found':
        return this.translocoService.translate('auth.errors.userNotFound');

      case 'auth/wrong-password':
        return this.translocoService.translate('auth.errors.wrongPassword');

      case 'auth/too-many-requests':
        return this.translocoService.translate('auth.errors.tooManyRequests');

      case 'auth/network-request-failed':
        return this.translocoService.translate('auth.errors.networkFailed');

      default:
        return this.translocoService.translate('auth.errors.loginDefault');
    }
  }
}