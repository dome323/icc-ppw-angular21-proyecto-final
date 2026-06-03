import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // <- 1. Importamos el módulo de rutas
import { Footer } from "../../../../shared/components/footer/footer";
import { Navbar } from "../../../../shared/components/navbar/navbar";

@Component({
  selector: 'app-home-page',
  // 2. Agregamos RouterModule al arreglo de imports
  imports: [RouterModule, Footer, Navbar], 
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {}