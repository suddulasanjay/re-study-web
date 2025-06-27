import { Routes } from '@angular/router';
import { WelcomeComponent } from './features/welcome/welcome.component';
import { appRoute } from './app-route.constants';
import { scheduleRoutes } from './features/schedule/schedule.routes';
import { userValidatedGuard } from './common/guards/user-validated.guard';
import { ValidateComponent } from './features/validate/validate.component';

export const routes: Routes = [
  {
    path: 'welcome',
    component: WelcomeComponent,
  },
  {
    path: appRoute.home,
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
    canActivate: [userValidatedGuard],
  },
  {
    path: appRoute.dashboard,
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    canActivate: [userValidatedGuard],
  },
  {
    path: appRoute.settings,
    loadComponent: () =>
      import('./features/settings/settings.component').then(
        (m) => m.SettingsComponent
      ),
    canActivate: [userValidatedGuard],
  },
  {
    path: appRoute.schedule,
    loadComponent: () =>
      import('./features/schedule/schedule.component').then(
        (m) => m.ScheduleComponent
      ),
    canActivate: [userValidatedGuard],
    canActivateChild: [userValidatedGuard],
    children: scheduleRoutes,
  },
  {
    path: appRoute.learn + '/:id',
    loadComponent: () =>
      import('./features/study-session/study-session.component').then(
        (m) => m.StudySessionComponent
      ),
    canActivate: [userValidatedGuard],
  },
  {
    path: appRoute.notifications,
    loadComponent: () =>
      import('./features/notifications/notifications.component').then(
        (m) => m.NotificationsComponent
      ),
    canActivate: [userValidatedGuard],
  },
  {
    path: appRoute.validate,
    component: ValidateComponent,
  },
  {
    path: '**',
    redirectTo: appRoute.home,
  },
];
