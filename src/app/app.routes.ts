import { Routes } from '@angular/router';

import { HomePageComponent } from './features/home/pages/home-page/home-page';
import { ProjectsPageComponent } from './features/projects/pages/projects-page/projects-page';
import { RegisterComponent } from './features/auth/pages/register/register';
import { LoginComponent } from './features/auth/pages/login/login/login';
import { authGuard } from './core/guards/auth-guard';
import { ProgramadoresPageComponent } from './features/programadores/pages/programadores-page/programadores-page';
import { ProgramadorDetailPageComponent } from './features/programadores/pages/programador-detail-page/programador-detail-page';
import { ProjectDetailPageComponent } from './features/projects/pages/project-detail-page/project-detail-page';
import { ServiciosPageComponent } from './features/servicios/pages/servicios-page/servicios-page';
import { ContactPageComponent } from './features/contact/pages/contact-page/contact-page';
import { MisSolicitudesPageComponent } from './features/solicitudes/pages/mis-solicitudes-page/mis-solicitudes-page';
import { SolicitudesRecibidasPageComponent } from './features/solicitudes/pages/solicitudes-recibidas-page/solicitudes-recibidas-page';
import { programadorGuard } from './core/guards/programador-guard';

export const routes: Routes = [

  { path: '', component: HomePageComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
  { path: 'programadores', component: ProgramadoresPageComponent},
  { path: 'programadores/:slug', component: ProgramadorDetailPageComponent },
  
  { path: 'proyectos',component: ProjectsPageComponent},
  { path: 'proyectos/:slug',component: ProjectDetailPageComponent},
  
  { path: 'servicios', component: ServiciosPageComponent},

  { path: 'contact',component: ContactPageComponent,canActivate: [authGuard]},
  { path: 'mis-solicitudes',component: MisSolicitudesPageComponent,canActivate: [authGuard]},
  
  { path: 'solicitudes-recibidas',component: SolicitudesRecibidasPageComponent,canActivate: [authGuard]},
  { path: 'solicitudes-recibidas',component: SolicitudesRecibidasPageComponent,canActivate: [authGuard,programadorGuard]},
  
  { path: '**', redirectTo: '' }

];
