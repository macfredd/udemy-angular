import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface MenuItems {
  router: string,
  name: string,
  icon: string
}

@Component({
  selector: 'maps-site-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './site-menu.component.html',
  styleUrl: './site-menu.component.css'
})
export class SiteMenuComponent {
  public menuItems: MenuItems[] = [
    { router: '/maps/fullscreen', name: 'Fullscreen', icon: 'fa-solid fa-desktop' },
    { router: '/maps/properties', name: 'Properties', icon: 'fa-solid fa-house-chimney-window'},
    { router: '/alone', name: 'Alone', icon: 'fa-solid fa-user'}
  ]
}
