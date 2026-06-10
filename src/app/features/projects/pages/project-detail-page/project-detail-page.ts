import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  RouterModule
} from '@angular/router';

import { HeaderComponent } from '../../../../shared/components/app-header/app-header';
import { FooterComponent } from '../../../../shared/components/app-footer/app-footer';

import { StrapiService } from '../../../../core/services/strapi/strapi.service';
import { MediaUrlService } from '../../../../core/services/strapi/media-url.service';

@Component({
  selector: 'app-project-detail-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './project-detail-page.html',
  styleUrl: './project-detail-page.css'
})
export class ProjectDetailPageComponent implements OnInit {

  proyecto: any = null;
  cargando = true;
  mensajeError = '';

  constructor(
    private route: ActivatedRoute,
    private strapiService: StrapiService,
    public mediaUrl: MediaUrlService,
    private cd: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {

    try {

      const slug =
        this.route.snapshot.paramMap.get('slug');

      if (!slug) {
        this.mensajeError =
          'No se encontró el proyecto solicitado.';
        return;
      }

      const response: any =
        await this.strapiService
          .getProyectoBySlug(slug);

      this.proyecto =
        response.data?.[0] ?? null;

      console.log(
        'PROYECTO DETALLE:',
        this.proyecto
      );

      if (!this.proyecto) {
        this.mensajeError =
          'No se encontró el proyecto.';
      }

    } catch (error) {

      console.error(
        'Error al cargar proyecto:',
        error
      );

      this.mensajeError =
        'No fue posible cargar el proyecto.';

    } finally {

      this.cargando = false;
      this.cd.detectChanges();

    }
  }

  getPreviewTags(
    tecnologias: unknown
  ): string[] {

    if (!tecnologias) {
      return [];
    }

    if (Array.isArray(tecnologias)) {

      return tecnologias
        .map((item: any) => {

          if (typeof item === 'string') {
            return item.trim();
          }

          return (
            item?.nombre ??
            item?.name ??
            item?.attributes?.nombre ??
            ''
          );

        })
        .filter(Boolean);
    }

    if (typeof tecnologias === 'string') {

      return tecnologias
        .split(',')
        .map(item => item.trim())
        .filter(Boolean);
    }

    return [];
  }

  obtenerTextoCompleto(
    contenido: any
  ): string {

    if (!contenido) {
      return '';
    }

    if (typeof contenido === 'string') {
      return contenido;
    }

    if (Array.isArray(contenido)) {

      return contenido
        .map((bloque: any) => {

          if (
            Array.isArray(bloque?.children)
          ) {
            return bloque.children
              .map(
                (hijo: any) =>
                  hijo?.text ?? ''
              )
              .join('');
          }

          return bloque?.text ?? '';

        })
        .filter(Boolean)
        .join('\n\n');
    }

    return '';
  }
}
