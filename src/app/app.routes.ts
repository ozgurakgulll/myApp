import { Routes } from '@angular/router';
import { SessionGuard } from './shared/guards/session-guard.service';
import { OfflineGuardService } from './shared/guards/offline-guard.service';
export const routes: Routes = [
  {
    path: '',
    canActivate: [SessionGuard],
    loadChildren: () =>
      import('./pages/pages.routes').then((m) => m.pagesRoute),
  },
  {
    path: 'login',
    canActivate: [OfflineGuardService],
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
  },
  {
    path: '**',
    redirectTo: '',
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./pages/users/users.page').then((m) => m.UsersPage),
  },
];
