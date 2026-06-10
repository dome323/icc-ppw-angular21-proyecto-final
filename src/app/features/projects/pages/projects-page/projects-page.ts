import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
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
    HeaderComponent
  ],
  templateUrl: './projects-page.html',
  styleUrl: './projects-page.css'
})
export class ProjectsPageComponent implements OnInit {

  proyectos: any[] = [];
  filteredProyectos: any[] = [];
  filtros: string[] = ['Todos'];
  selectedFilter = 'Todos';
  totalProyectos = 0;

  constructor(
    private strapiService: StrapiService,
    private cd: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    const response: any = await this.strapiService.getProyectos();
    this.proyectos = response.data ?? [];
    this.totalProyectos = this.proyectos.length;
    this.populateFiltros();
    this.applyFilter('Todos');
    this.cd.detectChanges();
  }

  populateFiltros() {
    const tipos = this.proyectos
      .map(proyecto => proyecto.tipoProyecto?.toString()?.trim())
      .filter(Boolean);

    const uniqueTipos = [...new Set(tipos)];
    this.filtros = ['Todos', ...uniqueTipos];
  }

  applyFilter(filtro: string) {
    this.selectedFilter = filtro;
    if (filtro === 'Todos') {
      this.filteredProyectos = this.proyectos;
      return;
    }

    this.filteredProyectos = this.proyectos.filter(
      proyecto => proyecto.tipoProyecto?.toString()?.trim() === filtro
    );
  }

  getPreviewTags(proyecto: any): string[] {
    if (!proyecto.tecnologias) {
      return [];
    }

    return proyecto.tecnologias
      .toString()
      .split(',')
      .map((tag: string) => tag.trim())
      .filter(Boolean);
  }
}
