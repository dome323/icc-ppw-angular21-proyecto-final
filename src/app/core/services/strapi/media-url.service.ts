import { Injectable } from '@angular/core';
import { environment } from '../../../../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class MediaUrlService {

  get(media: any): string {

    if (!media) {
      return '';
    }

    let url = '';

    // Si llega directamente como texto
    if (typeof media === 'string') {
      url = media;
    }

    // Strapi 5: objeto directo
    else if (typeof media?.url === 'string') {
      url = media.url;
    }

    // Strapi 5: arreglo
    else if (
      Array.isArray(media) &&
      media.length > 0
    ) {
      url =
        media[0]?.url ??
        media[0]?.attributes?.url ??
        '';
    }

    // Strapi 4: objeto dentro de data
    else if (media?.data?.attributes?.url) {
      url = media.data.attributes.url;
    }

    // Strapi 4: data con objeto directo
    else if (media?.data?.url) {
      url = media.data.url;
    }

    // Strapi 4: arreglo dentro de data
    else if (
      Array.isArray(media?.data) &&
      media.data.length > 0
    ) {
      url =
        media.data[0]?.url ??
        media.data[0]?.attributes?.url ??
        '';
    }

    if (!url) {
      return '';
    }

    // Si Strapi ya devuelve URL completa
    if (
      url.startsWith('http://') ||
      url.startsWith('https://')
    ) {
      return url;
    }

    return `${environment.strapiBaseUrl}${url}`;
  }
}

