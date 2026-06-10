import {ChangeDetectorRef,Component,OnInit} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

import { FooterComponent } from '../../../../shared/components/app-footer/app-footer';
import { HeaderComponent } from '../../../../shared/components/app-header/app-header';
import { StrapiService } from '../../../../core/services/strapi/strapi.service';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslocoModule,
    FooterComponent,
    HeaderComponent,
  ],
  templateUrl: './projects-page.html',
  styleUrl: './projects-page.css'
})
export class ProjectsPageComponent implements OnInit {

  proyectos: any[] = [];
  filteredProyectos: any[] = [];

  filtros: string[] = [
    'todos',
    'academico',
    'personal',
    'laboral',
    'simulado'
  ];

  selectedFilter = 'todos';

  constructor(
    private strapiService: StrapiService,
    private cd: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    try {
      const response: any =
        await this.strapiService.getProyectos();

      this.proyectos = response.data ?? [];
      this.filteredProyectos = [...this.proyectos];

    } catch (error) {
      console.error(
        'Error al cargar proyectos:',
        error
      );

      this.proyectos = [];
      this.filteredProyectos = [];

    } finally {
      this.cd.detectChanges();
    }
  }

  get totalProyectos(): number {
    return this.proyectos.length;
  }

  applyFilter(filtro: string): void {
    this.selectedFilter = filtro;

    if (filtro === 'todos') {
      this.filteredProyectos = [...this.proyectos];
      return;
    }

    this.filteredProyectos =
      this.proyectos.filter(
        proyecto =>
          proyecto.tipoProyecto
            ?.toLowerCase() === filtro.toLowerCase()
      );
  }

  getPreviewTags(
    tecnologias: string | string[]
  ): string[] {

    if (Array.isArray(tecnologias)) {
      return tecnologias.slice(0, 3);
    }

    if (!tecnologias) {
      return [];
    }

    return tecnologias
      .split(',')
      .map(tecnologia => tecnologia.trim())
      .filter(Boolean)
      .slice(0, 3);
  }
}