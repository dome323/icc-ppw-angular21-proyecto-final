import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

import { StrapiService } from '../../../../core/services/strapi/strapi.service';
import { MediaUrlService } from '../../../../core/services/strapi/media-url.service';

import { HeaderComponent } from '../../../../shared/components/app-header/app-header';
import { FooterComponent } from '../../../../shared/components/app-footer/app-footer';

import { TiltDirective } from '../tilt.directive';

@Component({
  selector: 'app-programadores-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslocoModule,
    HeaderComponent,
    FooterComponent,
    TiltDirective
  ],
  templateUrl: './programadores-page.html',
  styleUrl: './programadores-page.css'
})
export class ProgramadoresPageComponent implements OnInit {

  programadores: any[] = [];

  cargando = true;
  mensajeError = '';

  constructor(
    private strapiService: StrapiService,
    public mediaUrl: MediaUrlService,
    private cd: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {

    try {

      const response: any =
        await this.strapiService.getProgramadores();

      this.programadores =
        (response.data ?? []).filter(
          (programador: any) =>
            programador.activo !== false
        );

      console.log(
        'PROGRAMADORES:',
        this.programadores
      );

    } catch (error) {

      console.error(
        'Error al cargar programadores:',
        error
      );

      this.programadores = [];
      this.mensajeError =
        'No fue posible cargar los programadores.';

    } finally {

      this.cargando = false;
      this.cd.detectChanges();

    }
  }
}

