import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PagesComponent} from "./pages.component";
import {UsersModule} from "./users/users.module";

const routes: Routes = [
  {
    path: '',
    component:PagesComponent,
    children: [
      {
        path: 'list',
        loadChildren: () =>
          import('./list/list.module').then((m) => m.ListModule),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'order-detail/:orderId',
        loadChildren: () =>
          import('./order-detail/order-detail.module').then(
            (m) => m.OrderDetailPageModule
          ),
      },
      {
        path: 'new-order',
        loadComponent: () =>
          import('./new-order/new-order.page').then((m) => m.NewOrderPage),
      },
      { path: '', redirectTo: 'list', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
