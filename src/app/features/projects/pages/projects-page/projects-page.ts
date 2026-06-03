import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Para que funcionen los enlaces
import { Footer } from '../../../../shared/components/footer/footer';
import { Navbar } from '../../../../shared/components/navbar/navbar';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [RouterModule, Footer, Navbar],
  templateUrl: './projects-page.html',
  styleUrl: './projects-page.css'
})
export class ProjectsPage {}