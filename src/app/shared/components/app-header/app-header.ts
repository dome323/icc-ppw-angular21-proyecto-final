import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { AuthService } from '../../../core/services/auth/auth'; // Revisa que esta ruta a tu servicio sea la correcta
import { User } from 'firebase/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app-header.html',
  styleUrl: './app-header.css'
})
export class HeaderComponent implements OnInit {
  usuarioLogueado: User | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Escuchamos en tiempo real si el usuario inicia o cierra sesión
    this.authService.currentUser$.subscribe(user => {
      this.usuarioLogueado = user;
    });
  }

  async onLogout() {
    try {
      await this.authService.logout();
      alert('Sesión cerrada correctamente');
      this.router.navigate(['/']); // Redirige al Home al salir
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}