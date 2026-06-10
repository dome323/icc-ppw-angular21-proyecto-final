import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FooterComponent } from '../../../../shared/components/app-footer/app-footer';
import { HeaderComponent } from '../../../../shared/components/app-header/app-header';

import { StrapiService } from '../../../../core/services/strapi/strapi.service';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FooterComponent,
    HeaderComponent
  ],
  templateUrl: './projects-page.html',
  styleUrl: './projects-page.css'
})
export class ProjectsPageComponent implements OnInit {

  proyectos: any[] = [];

constructor(
  private strapiService: StrapiService,
  private cd: ChangeDetectorRef
) {}

async ngOnInit() {

  const response: any =
    await this.strapiService.getProyectos();

  this.proyectos = response.data;

console.log(this.proyectos);
  this.cd.detectChanges();
}



}