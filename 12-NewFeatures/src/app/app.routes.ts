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
                path: 'view-transition-1', 
                title: 'View Transition 1', 
                loadComponent: () => 
                    import('./dashboard/pages/view-transition/view-transition.component1')
                    .then(c => c.ViewTransitionComponent1)
            },
            {
                path: 'view-transition-2', 
                title: 'View Transition 2', 
                loadComponent: () => 
                    import('./dashboard/pages/view-transition/view-transition.component2')
                    .then(c => c.ViewTransitionComponent2)
            },
            {
                path: '',
                redirectTo: 'view-transition-1',
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
