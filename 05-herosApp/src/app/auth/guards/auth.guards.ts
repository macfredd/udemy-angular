import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, 
    CanActivateFn, 
    CanMatchFn, 
    Route,
    Router, 
    RouterStateSnapshot, 
    UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, tap } from 'rxjs';

const checkAuthStatus = (): boolean | Observable<boolean> => {
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);
   
    return authService.checkAuth().pipe(
      tap((isAuthenticated) => {
        if (!isAuthenticated) {
          router.navigate(['/auth/login']);
        }
      })
    );
  };
  
export const canActivateGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {   
    return checkAuthStatus();
};
   
export const canMatchGuard: CanMatchFn = (
    route: Route,
    segments: UrlSegment[]
  ) => {   
    return checkAuthStatus();
};