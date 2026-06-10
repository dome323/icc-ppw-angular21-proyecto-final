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

import { AuthService } from '../../../../core/services/auth/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {

  email = '';
  password = '';
  confirmarPassword = '';

  cargando = false;
  formularioEnviado = false;
  mensajeError = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  get passwordsNoCoinciden(): boolean {
    return (
      this.confirmarPassword.length > 0 &&
      this.password !== this.confirmarPassword
    );
  }

  async onRegister(formulario: NgForm) {

    this.formularioEnviado = true;
    this.mensajeError = '';

    if (
      formulario.invalid ||
      this.passwordsNoCoinciden
    ) {
      formulario.control.markAllAsTouched();
      return;
    }

    try {

      this.cargando = true;

      await this.authService.register(
        this.email.trim(),
        this.password
      );

      await this.router.navigate(['/']);

    } catch (error: any) {

      console.error(
        'Error al registrar usuario:',
        error
      );

      this.mensajeError =
        this.obtenerMensajeError(error.code);

    } finally {
      this.cargando = false;
    }
  }

  limpiarError() {
    this.mensajeError = '';
  }

  private obtenerMensajeError(codigo: string): string {

    switch (codigo) {

      case 'auth/email-already-in-use':
        return 'Ya existe una cuenta con este correo.';

      case 'auth/invalid-email':
        return 'El correo electrónico no es válido.';

      case 'auth/weak-password':
        return 'La contraseña es demasiado débil.';

      case 'auth/network-request-failed':
        return 'Revisa tu conexión a Internet.';

      default:
        return 'No fue posible crear la cuenta.';
    }
  }
}