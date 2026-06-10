import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { StrapiService } from '../../../../core/services/strapi/strapi.service';
import { FooterComponent } from '../../../../shared/components/app-footer/app-footer';
import { HeaderComponent } from '../../../../shared/components/app-header/app-header';

@Component({
  selector: 'app-servicios-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './servicios-page.html',
  styleUrl: './servicios-page.css'
})
export class ServiciosPageComponent implements OnInit {

  servicios: any[] = [];

  serviceTitles = [
    'Desarrollo Full Stack',
    'Oracle Database',
    'Ciberseguridad',
    'Infraestructura',
    'Cloud / AWS',
    'Redes empresariales',
    'Auditoría de seguridad',
    'Arquitectura de software',
    'Sistemas embebidos',
    'DevOps & CI/CD',
    'Automatización',
    'Integración de IA'
  ];

constructor(
  private strapiService: StrapiService,
  private cd: ChangeDetectorRef
) {}

  async ngOnInit() {

    const response: any =
      await this.strapiService.getServicios();

    this.servicios = response.data;

    console.log(this.servicios);

    this.cd.detectChanges();

  }

}