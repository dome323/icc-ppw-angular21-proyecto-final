import { Routes } from '@angular/router';
import { HomePageComponent } from './features/home/pages/home-page/home-page'; 
import { ProjectsPageComponent } from './features/projects/pages/projects-page/projects-page'; 
import { RegisterComponent } from './features/auth/pages/register/register';
import { LoginComponent } from './features/auth/pages/login/login/login';


export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'proyectos', component: ProjectsPageComponent }, 
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }, 
  { path: '**', redirectTo: '' }
];