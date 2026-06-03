import { Routes } from '@angular/router';
import { HomePage } from './features/home/pages/home-page/home-page';
import { ProjectsPage } from './features/projects/pages/projects-page/projects-page';
import { LoginComponent } from './features/auth/pages/login/login/login';

export const routes: Routes = [
  {path: '',component: HomePage,},
  {path: 'proyectos',component: ProjectsPage,},
  { path: 'login', component: LoginComponent },
  {path: '**',redirectTo: ''}
];