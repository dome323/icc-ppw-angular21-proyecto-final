import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';


import { StrapiService } from '../../../../core/services/strapi/strapi.service';
import { HeaderComponent } from '../../../../shared/components/app-header/app-header';
import { FooterComponent } from '../../../../shared/components/app-footer/app-footer';
import { TiltDirective } from '../tilt.directive';

@Component({
  selector: 'app-programador-detail-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    FooterComponent,
    TiltDirective
  ],
  templateUrl: './programador-detail-page.html',
  styleUrl: './programador-detail-page.css'
})
export class ProgramadorDetailPageComponent implements OnInit {

  programador: any = null;

  constructor(
    private route: ActivatedRoute,
    private strapiService: StrapiService,
    private cd: ChangeDetectorRef
  ) {}

  async ngOnInit() {

    const slug =
      this.route.snapshot.paramMap.get('slug');

    const response: any =
      await this.strapiService.getProgramadorBySlug(slug!);

    this.programador = response.data[0];

  console.log(
  JSON.stringify(this.programador, null, 2)
);

    this.cd.detectChanges();

  }

obtenerTextoCompleto(bloques: any[]): string {

  if (!Array.isArray(bloques)) {
    return '';
  }

  return bloques
    .map(bloque =>
      bloque.children
        ?.map((child: any) => child.text ?? '')
        .join('')
    )
    .filter(Boolean)
    .join('\n\n');
}

}