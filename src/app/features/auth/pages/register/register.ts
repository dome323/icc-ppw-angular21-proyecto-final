import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = ''; // Para validar que no se equivoque al escribirla

  constructor(private authService: AuthService, private router: Router) {}

  async onRegister() {
    console.log('Intentando registrar con:', this.email); // Esto nos ayudará a saber si el botón responde

    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    if (this.password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    try {
      await this.authService.register(this.email, this.password);
      alert('¡Cuenta creada con éxito!');
      this.router.navigate(['/']);
    } catch (error: any) {
      console.error('Error de Firebase:', error);
      alert('Error al registrar: ' + error.message);
    }
  }
}