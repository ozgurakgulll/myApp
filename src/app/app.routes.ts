import { Routes } from '@angular/router';
import {SessionGuard} from "./login/session-guard.service";
export const routes: Routes = [
  {
    path: '',
    canActivate: [SessionGuard],
    loadChildren: () =>
      import('./master/master.module').then((m) => m.MasterModule)
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
]
