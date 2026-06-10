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

  serviceCards = [
    {
      nombre: 'Desarrollo Full Stack',
      descripcion: 'Creación de aplicaciones web modernas con Angular.'
    },
    {
      nombre: 'Oracle Database',
      descripcion: 'Diseño de interfaces atractivas y fáciles de usar.'
    },
    {
      nombre: 'Ciberseguridad',
      descripcion: 'Autenticación y almacenamiento de datos en la nube.'
    },
    {
      nombre: 'Infraestructura',
      descripcion: 'Plataformas robustas para entornos de misión crítica.'
    },
    {
      nombre: 'Cloud / AWS',
      descripcion: 'Despliegue y operación escalables en la nube.'
    },
    {
      nombre: 'Redes empresariales',
      descripcion: 'Conectividad segura y de alto rendimiento para empresas.'
    },
    {
      nombre: 'Auditoría de seguridad',
      descripcion: 'Evaluaciones profundas que detectan riesgos reales.'
    },
    {
      nombre: 'Arquitectura de software',
      descripcion: 'Estructuras limpias y escalables para sistemas complejos.'
    },
    {
      nombre: 'Sistemas embebidos',
      descripcion: 'Soluciones integradas para dispositivos inteligentes.'
    },
    {
      nombre: 'DevOps & CI/CD',
      descripcion: 'Automatización de entregas rápidas y confiables.'
    },
    {
      nombre: 'Automatización',
      descripcion: 'Optimización de procesos con flujos inteligentes.'
    },
    {
      nombre: 'Integración de IA',
      descripcion: 'Capacidades inteligentes para potenciar tus productos.'
    }
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