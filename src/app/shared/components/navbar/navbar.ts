import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Importante para los routerLink del menú

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {}