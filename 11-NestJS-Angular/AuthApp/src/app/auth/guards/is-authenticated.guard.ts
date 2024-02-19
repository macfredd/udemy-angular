import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.authStatus() === 'CHECKING') 
    return false;

  if (authService.authStatus() === 'AUTHENTICATED') 
    return true;
  
  router.navigate(['/auth/login']);
  return false;
};
