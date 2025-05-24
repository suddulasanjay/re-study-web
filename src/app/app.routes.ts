import { Routes } from '@angular/router';
import { WelcomeComponent } from './features/welcome/welcome.component';
import { appRoute } from './app-route.constants';

export const routes: Routes = [
    {
        path : 'welcome', component : WelcomeComponent
    },
    {
        path: appRoute.home,
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
    },
    {
        path : '**', redirectTo : appRoute.home
    }
];
