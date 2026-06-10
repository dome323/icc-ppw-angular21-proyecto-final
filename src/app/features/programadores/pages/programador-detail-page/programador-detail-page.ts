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

import { StrapiService } from '../../../../core/services/strapi/strapi.service';
import { MediaUrlService } from '../../../../core/services/strapi/media-url.service';

import { HeaderComponent } from '../../../../shared/components/app-header/app-header';
import { FooterComponent } from '../../../../shared/components/app-footer/app-footer';

@Component({
  selector: 'app-programador-detail-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './programador-detail-page.html',
  styleUrl: './programador-detail-page.css'
})
export class ProgramadorDetailPageComponent implements OnInit {

  programador: any = null;
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
          'No se encontró el programador.';
        return;
      }

      const response: any =
        await this.strapiService
          .getProgramadorBySlug(slug);

      this.programador =
        response.data?.[0] ?? null;

      if (!this.programador) {
        this.mensajeError =
          'No se encontró el programador.';
      }

      console.log(
        'PROGRAMADOR DETALLE:',
        this.programador
      );

    } catch (error) {
      console.error(
        'Error al cargar programador:',
        error
      );

      this.mensajeError =
        'No fue posible cargar el programador.';

    } finally {
      this.cargando = false;
      this.cd.detectChanges();
    }
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

          if (Array.isArray(bloque?.children)) {
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
        .filter(Boolean)
        .slice(0, 3);
    }

    if (typeof tecnologias === 'string') {
      return tecnologias
        .split(',')
        .map(item => item.trim())
        .filter(Boolean)
        .slice(0, 3);
    }

    return [];
  }
}