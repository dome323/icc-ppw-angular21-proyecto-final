import { Component, OnInit, ChangeDetectorRef } from '@angular/core';import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../../shared/components/app-footer/app-footer';
import { HeaderComponent } from "../../../../shared/components/app-header/app-header";

import { CommonModule } from '@angular/common';
import { StrapiService } from '../../../../core/services/strapi/strapi.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ CommonModule,
             RouterModule,
             FooterComponent,
             HeaderComponent], 
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePageComponent implements OnInit {

  programadores: any[] = [];
  proyectos: any[] = [];
  servicios: any[] = [];

  constructor(
    private strapiService: StrapiService,
    private cd: ChangeDetectorRef
  ) {}

  async ngOnInit() {

  const programadoresResponse: any =
    await this.strapiService.getProgramadores();

  this.programadores =
    programadoresResponse.data;

  const proyectosResponse: any =
    await this.strapiService.getProyectos();

  this.proyectos = proyectosResponse.data.filter(
    (proyecto: any) => proyecto.destacado === true
  );

  const serviciosResponse: any =
    await this.strapiService.getServicios();

  this.servicios =
    serviciosResponse.data;

  this.cd.detectChanges();

}

}