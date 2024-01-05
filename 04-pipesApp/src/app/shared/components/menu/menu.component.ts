import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'shared-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit{
  
  ngOnInit(): void {
    this.items = [
      {
        label: 'Angular Pipes', 
        icon: 'pi pi-filter',
        items: [
          {
            label: 'Texts and Dates',
            icon: 'pi pi-align-left',
            routerLink: '/'
          },
          {
            label: 'Numbers',
            icon: 'pi pi-dollar',
            routerLink: 'numbers'
          },
          {
            label: 'UnCommons',
            icon: 'pi pi-globe',
            routerLink: 'uncommon'
          }
        ]
      },{
        label: 'Custom Pipes', 
        icon: 'pi pi-briefcase',
        items: [
          {
            label: 'Customs',
            icon: 'pi pi-cog',
            routerLink: 'customs',
          },
          {
            label: 'Table',
            icon: 'pi pi-table',
            routerLink: 'table',
          }
        ]
        
      }
    ]
  }

  public items: MenuItem[] = [];
}
