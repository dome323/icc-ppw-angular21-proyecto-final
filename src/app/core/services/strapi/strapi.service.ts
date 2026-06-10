import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StrapiService {

  private apiUrl = 'http://localhost:1337/api';

  constructor(private http: HttpClient) {}

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
      `${this.apiUrl}/programadores?filters[slug][$eq]=${slug}&populate=*`
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
      `${this.apiUrl}/proyectos?filters[slug][$eq]=${slug}&populate=*`
    )
  );

}

  async getServicios() {
    return await firstValueFrom(
      this.http.get(`${this.apiUrl}/servicios`)
    );
  }

async getProgramadorByCorreo(correo: string) {
  return await firstValueFrom(
    this.http.get(
      `${this.apiUrl}/programadores?filters[correo][$eq]=${encodeURIComponent(correo)}&populate=*`
    )
  );
}
}