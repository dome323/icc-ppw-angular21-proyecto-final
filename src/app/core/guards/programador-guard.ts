import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router
} from '@angular/router';

import { AuthService } from '../services/auth/auth';
import { StrapiService } from '../services/strapi/strapi.service';

export const programadorGuard: CanActivateFn =
  async () => {

    const authService = inject(AuthService);
    const strapiService = inject(StrapiService);
    const router = inject(Router);

    const usuario =
      await authService.getCurrentUser();

    if (!usuario?.email) {
      return router.createUrlTree(['/login']);
    }

    try {

      const response: any =
        await strapiService.getProgramadorByCorreo(
          usuario.email
        );

      const esProgramador =
        response.data &&
        response.data.length > 0;

      if (esProgramador) {
        return true;
      }

      return router.createUrlTree([
        '/mis-solicitudes'
      ]);

    } catch (error) {

      console.error(
        'Error al validar programador:',
        error
      );

      return router.createUrlTree(['/']);
    }
  };