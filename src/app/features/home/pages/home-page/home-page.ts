import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../../shared/components/app-footer/app-footer';
import { HeaderComponent } from '../../../../shared/components/app-header/app-header';
import { TranslocoModule } from '@ngneat/transloco';
import { environment } from '../../../../../enviroments/environment';
import { CommonModule } from '@angular/common';
import { StrapiService } from '../../../../core/services/strapi/strapi.service';
import { MediaUrlService } from '../../../../core/services/strapi/media-url.service';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslocoModule,
    FooterComponent,
    HeaderComponent
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePageComponent implements OnInit {

  programadores: any[] = [];
  proyectos: any[] = [];
  servicios: any[] = [];
  hoveredProgramador: any = null;
  strapiBaseUrl: string = environment.strapiUrl;

  private teamStats: Record<string, {
    level: number;
    badge: string;
    role: string;
    skills: { label: string; value: number }[];
  }> = {
    'Josue Valdez': {
      level: 48,
      badge: 'Enterprise Dev & Network Engineer',
      role: 'Full Stack Dev & Network Engineer',
      skills: [
        { label: 'Backend & DB (Java / Oracle SQL)', value: 9 },
        { label: 'Frontend Frameworks (Angular / React)', value: 8 },
        { label: 'Networks & Infrastructure (Cisco Routing)', value: 8 },
        { label: 'Cybersecurity & Monitoring (Snort / Nagios)', value: 8 },
        { label: 'Cloud Architecture (Cloudflare / Hostinger Deployment)', value: 8 },
        { label: 'Business Automation & AI Integrations', value: 7 }
      ]
    },
    'Domenica Uyunkar': {
      level: 43,
      badge: 'Frontend Tactical Specialist',
      role: 'Cisco / UI Performance',
      skills: [
        { label: 'Frontend Frameworks (Angular / React)', value: 9 },
        { label: 'Networks & Infrastructure (Cisco Routing)', value: 8 },
        { label: 'Cybersecurity & Monitoring (Snort / Nagios)', value: 8 },
        { label: 'Cloud Architecture (Cloudflare / Hostinger Deployment)', value: 8 }
      ]
    }
  };

  constructor(
    private strapiService: StrapiService,
    private cd: ChangeDetectorRef,
    public mediaUrl: MediaUrlService

  ) {}

  async ngOnInit() {

    const programadoresResponse: any =
      await this.strapiService.getProgramadores();

    this.programadores =
      programadoresResponse.data;

    const proyectosResponse: any =
      await this.strapiService.getProyectos();

    this.proyectos = proyectosResponse.data.filter(
      (proyecto: any) => proyecto.destacado === true
    );

    const serviciosResponse: any =
      await this.strapiService.getServicios();

    this.servicios = serviciosResponse.data;

    this.cd.detectChanges();

  }

  setHover(programador: any) {
    const stats = this.teamStats[programador.nombre] || {
      level: 41,
      badge: 'Technical Specialist',
      role: programador.especialidad || 'Equipo Premium',
      skills: [
        { label: 'Backend & DB (Java / Oracle SQL)', value: 8 },
        { label: 'Frontend Frameworks (Angular / React)', value: 8 },
        { label: 'Networks & Infrastructure (Cisco Routing)', value: 8 },
        { label: 'Cloud Architecture (Cloudflare / Hostinger Deployment)', value: 8 }
      ]
    };
    this.hoveredProgramador = { ...programador, ...stats };
  }

  clearHover() {
    this.hoveredProgramador = null;
  }

}