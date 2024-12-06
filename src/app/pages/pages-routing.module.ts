import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        loadChildren: () =>
          import('./list/list.module').then((m) => m.ListModule),
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
