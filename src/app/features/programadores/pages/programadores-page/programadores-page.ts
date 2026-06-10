import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from '../../../../shared/components/app-header/app-header';
import { FooterComponent } from '../../../../shared/components/app-footer/app-footer';
import { TiltDirective } from '../tilt.directive';

import { StrapiService } from '../../../../core/services/strapi/strapi.service';

@Component({
  selector: 'app-programadores-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    FooterComponent,
    TiltDirective
  ],
  templateUrl: './programadores-page.html',
  styleUrl: './programadores-page.css'
})
export class ProgramadoresPageComponent implements OnInit {

  programadores: any[] = [];

  constructor(
  private strapiService: StrapiService,
  private cd: ChangeDetectorRef
) {}

  async ngOnInit() {

  const response: any =
    await this.strapiService.getProgramadores();

  this.programadores = response.data;

  console.log(this.programadores);

  this.cd.detectChanges();

}

}