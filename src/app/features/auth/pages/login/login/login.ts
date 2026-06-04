import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router,RouterModule} from '@angular/router';
import { AuthService } from '../../../../../core/services/auth/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule], 
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  async onLogin() {
    if (!this.email || !this.password) {
      alert('Por favor, llena todos los campos.');
      return;
    }

    try {
      await this.authService.login(this.email, this.password);
      alert('¡Inicio de sesión exitoso!');
      this.router.navigate(['/']); 
    } catch (error: any) {
      console.error(error);
      alert('Error al iniciar sesión: ' + error.message);
    }
  }
}