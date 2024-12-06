import { Routes } from '@angular/router';
import { SessionGuard } from './shared/guards/session-guard.service';
import {OfflineGuardService} from "./shared/guards/offline-guard.service";
export const routes: Routes = [
  {
    path: '',
    canActivate: [SessionGuard],
    loadChildren: () =>
      import('./master/master.module').then((m) => m.MasterModule),
  },
  {
    path: 'login',
    canActivate:[OfflineGuardService],
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
  {
    path: 'users',
    loadComponent: () => import('./pages/users/users.page').then( m => m.UsersPage)
  },
];
