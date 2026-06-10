import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { HeaderComponent } from '../../../../shared/components/app-header/app-header';
import { FooterComponent } from '../../../../shared/components/app-footer/app-footer';

import { StrapiService } from '../../../../core/services/strapi/strapi.service';

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

  constructor(
    private route: ActivatedRoute,
    private strapiService: StrapiService,
    private cd: ChangeDetectorRef
  ) {}

  async ngOnInit() {

    const slug =
      this.route.snapshot.paramMap.get('slug');

    const response: any =
      await this.strapiService.getProyectoBySlug(slug!);

    this.proyecto = response.data[0];

    console.log(this.proyecto);

    this.cd.detectChanges();

  }

}