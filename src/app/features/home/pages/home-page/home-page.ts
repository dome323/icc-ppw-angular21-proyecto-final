import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../../shared/components/footer/footer';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterModule, FooterComponent, NavbarComponent], // Usamos los nombres correctos aquí
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {}