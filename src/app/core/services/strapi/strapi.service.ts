import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { environment } from '../../../../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class StrapiService {

  private apiUrl = environment.strapiUrl;

  constructor(
    private http: HttpClient
  ) {}

  async getProgramadores() {
    return await firstValueFrom(
      this.http.get(
        `${this.apiUrl}/programadores?populate=*`
      )
    );
  }

  async getProgramadorBySlug(slug: string) {
    return await firstValueFrom(
      this.http.get(
        `${this.apiUrl}/programadores?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`
      )
    );
  }

  async getProyectos() {
    return await firstValueFrom(
      this.http.get(
        `${this.apiUrl}/proyectos?populate=*`
      )
    );
  }

  async getProyectoBySlug(slug: string) {
    return await firstValueFrom(
      this.http.get(
        `${this.apiUrl}/proyectos?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`
      )
    );
  }

  async getServicios() {
    return await firstValueFrom(
      this.http.get(
        `${this.apiUrl}/servicios?populate=*`
      )
    );
  }

  async getProgramadorByCorreo(correo: string) {
    const correoLimpio =
      correo.trim().toLowerCase();

    return await firstValueFrom(
      this.http.get(
        `${this.apiUrl}/programadores?filters[correo][$eq]=${encodeURIComponent(correoLimpio)}&populate=*`
      )
    );
  }
}