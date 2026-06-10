import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
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
    FooterComponent,
    TranslocoModule
  ],
  templateUrl: './servicios-page.html',
  styleUrl: './servicios-page.css'
})
export class ServiciosPageComponent implements OnInit {

  servicios: any[] = [];

  get serviceCards(): any[] {
    return this.servicios;
  }

  constructor(
    private strapiService: StrapiService,
    private cd: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    try {
      const response: any =
        await this.strapiService.getServicios();

      this.servicios = response.data ?? [];

      console.log(this.servicios);

    } catch (error) {
      console.error(
        'Error al cargar servicios:',
        error
      );

      this.servicios = [];

    } finally {
      this.cd.detectChanges();
    }
  }
}