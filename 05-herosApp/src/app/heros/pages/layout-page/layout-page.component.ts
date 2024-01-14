import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../auth/interfaces/user.interface';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css'
})
export class LayoutPageComponent {

  public sidebarItems = [
    {label: 'List',   icon: 'list',   url: './list'},
    {label: 'New',    icon: 'add',    url: './create'},
    {label: 'Search', icon: 'search', url: './search'},
  ];

  constructor(private authService: AuthService,
    private router: Router) { }

  onLogout() {
    this.authService.logout()
    .subscribe(() => {
      this.router.navigate(['/auth/login']);
    });
  }

  get currentUser(): User | undefined {
    return this.authService.currentUser;
  }
}
