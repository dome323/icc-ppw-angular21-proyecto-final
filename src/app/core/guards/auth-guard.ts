import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth';

export const authGuard: CanActivateFn = async () => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const user = await authService.getCurrentUser();

  if (user) {
    return true;
  }

  return router.createUrlTree(['/login']);
};