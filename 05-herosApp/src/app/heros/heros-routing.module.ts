import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';

// localhost:4200/heros
const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      // localhost:4200/heros/list
      { path: 'list', component: ListPageComponent },
      // localhost:4200/heros/create
      { path: 'create', component: NewPageComponent },
      // localhost:4200/heros/edit/1
      { path: 'edit/:id', component: NewPageComponent},
      // localhost:4200/heros/search
      { path: 'search', component: SearchPageComponent },
      // localhost:4200/heros/1
      { path: ':id', component: HeroPageComponent },      
      { path: '**', redirectTo: 'list' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HerosRoutingModule { }
