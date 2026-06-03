import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from 'firebase/auth';
import { AuthService } from '../../../core/services/auth/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {
  usuarioLogueado: User | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Nos suscribimos para saber en tiempo real si el usuario entra o sale
    this.authService.currentUser$.subscribe(user => {
      this.usuarioLogueado = user;
    });
  }

  async onLogout() {
    try {
      await this.authService.logout();
      alert('Sesión cerrada correctamente');
      this.router.navigate(['/']); // Lo mandamos al Home al salir
    } catch (error) {
      console.error('Error al cerrar sesión', error);
    }
  }
}