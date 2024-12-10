import { Route } from '@angular/router';
import { PagesComponent } from './pages.component';

export const pagesRoute: Route[] = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'list',
        loadComponent: () => import('./list/list.page').then((m) => m.ListPage),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./users/users.page').then((m) => m.UsersPage),
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
    ],
  },
];
