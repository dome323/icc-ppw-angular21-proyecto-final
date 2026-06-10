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

export const routes: Routes = [

  { path: '', component: HomePageComponent },

  { path: 'proyectos',component: ProjectsPageComponent,canActivate: [authGuard]},

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
  { path: 'programadores', component: ProgramadoresPageComponent,canActivate: [authGuard] },
  { path: 'programadores/:slug', component: ProgramadorDetailPageComponent },
  
  { path: 'proyectos/:slug',component: ProjectDetailPageComponent},
  
  { path: 'servicios', component: ServiciosPageComponent,canActivate: [authGuard] },

  { path: '**', redirectTo: '' }

];
