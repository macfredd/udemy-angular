import { Routes } from '@angular/router';
import { ChangeDetectionComponent } from './dashboard/pages/change-detection/change-detection.component';

export const routes: Routes = [
    {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then(c => c.DashboardComponent),
        children: [
            {
                path: 'change-detection', 
                title: 'Change Detection',
                loadComponent: () => 
                    import('./dashboard/pages/change-detection/change-detection.component')
                    .then(c => c.ChangeDetectionComponent)
            },
            {
                path: 'control-flow', 
                title: 'Control Flow', 
                loadComponent: () => 
                    import('./dashboard/pages/control-flow/control-flow.component')
                    .then(c => c.ControlFlowComponent)
            },
            {
                path: 'deferred-options', 
                title: 'Deferred Options', 
                loadComponent: () => 
                    import('./dashboard/pages/deferred-options/deferred-options.component')
                    .then(c => c.DeferredOptionsComponent)
            },
            {
                path: 'deferred-views', 
                title: 'Deferred Views', 
                loadComponent: () => 
                    import('./dashboard/pages/deferred-views/deferred-views.component')
                    .then(c => c.DeferredViewsComponent)
            },
            {
                path: 'user/:id', 
                title: 'User', 
                loadComponent: () => 
                    import('./dashboard/pages/user/user.component')
                    .then(c => c.UserComponent)
            },
            {
                path: 'user-list', 
                title: 'Users List', 
                loadComponent: () => 
                    import('./dashboard/pages/users/users.component')
                    .then(c => c.UsersComponent)
            },
            {
                path: 'view-transition', 
                title: 'View Transition', 
                loadComponent: () => 
                    import('./dashboard/pages/view-transition/view-transition.component')
                    .then(c => c.ViewTransitionComponent)
            },
            {
                path: '',
                redirectTo: 'change-detection',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/dashboard',
    }
];
