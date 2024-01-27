import { Component } from '@angular/core';

interface MenuItems {
  router: string,
  name: string,
  icon: string
}

@Component({
  selector: 'maps-site-menu',
  templateUrl: './site-menu.component.html',
  styleUrl: './site-menu.component.css'
})
export class SiteMenuComponent {
  public menuItems: MenuItems[] = [
    { router: '/maps/fullscreen', name: 'Fullscreen', icon: 'fa-solid fa-desktop' },
    { router: '/maps/zoom-range', name: 'Zoom Range', icon: 'fa-solid fa-magnifying-glass' },
    { router: '/maps/markers', name: 'Marker', icon: 'fa-solid fa-location-dot'},
    { router: '/maps/properties', name: 'Properties', icon: 'fa-solid fa-house-chimney-window'},
  ]
}
