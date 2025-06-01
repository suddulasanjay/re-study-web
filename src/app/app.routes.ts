import { Routes } from '@angular/router';
import { WelcomeComponent } from './features/welcome/welcome.component';
import { appRoute } from './app-route.constants';
import { scheduleRoutes } from './features/schedule/schedule.routes';

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
        path: appRoute.dashboard,
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
    },
    {
        path: appRoute.settings,
    loadComponent: () =>
      import('./features/settings/settings.component').then((m) => m.SettingsComponent),
    },
    {
        path: appRoute.schedule,
    loadComponent: () =>
      import('./features/schedule/schedule.component').then((m) => m.ScheduleComponent),
      children : scheduleRoutes
    },
    {
        path: appRoute.learn+'/:id',
    loadComponent: () =>
      import('./features/study-session/study-session.component').then((m) => m.StudySessionComponent),
    },
    {
        path: appRoute.notifications,
    loadComponent: () =>
      import('./features/notifications/notifications.component').then((m) => m.NotificationsComponent),
    },
    {
        path : '**', redirectTo : appRoute.home
    }
];
