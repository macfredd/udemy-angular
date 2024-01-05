import { Component } from '@angular/core';

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
}
