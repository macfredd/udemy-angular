import { Component, computed, effect, inject } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { Router } from '@angular/router';
import { AuthStatus } from './auth/enums/auth-status.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  public checkAuthStatus = computed(() => {
    if (this.authService.authStatus() === AuthStatus.CHECKING) {
      return false;
    }
    return true;
  });

  public authStatusChangeEffect = effect(() => {
    switch (this.authService.authStatus()) {
      case AuthStatus.CHECKING:
        return;
      case AuthStatus.AUTHENTICATED:
        this.router.navigate(['/dashboard']);
        return;
      case AuthStatus.UNAUTHENTICATED:
        this.router.navigate(['/auth/login']);
        return;
    }
  });
  
}
