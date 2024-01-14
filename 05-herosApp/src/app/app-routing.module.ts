import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { canActivateAuthGuard, canMatchAuthGuard } from './auth/guards/auth.guards';
import { canActivatePublicGuard, canMatchPublicGuard } from './auth/guards/public.guards';

//localhost:4200
const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [canActivatePublicGuard],
    canMatch: [canMatchPublicGuard],
  },
  {
    path: 'heros',
    loadChildren: () => import('./heros/heros.module').then(m => m.HerosModule),
    canActivate: [canActivateAuthGuard],
    canMatch: [canMatchAuthGuard], 
  },
  {
    path: '404',
    component: Error404PageComponent,
  },
  {
    path: '',
    redirectTo: 'heros',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '404',
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
