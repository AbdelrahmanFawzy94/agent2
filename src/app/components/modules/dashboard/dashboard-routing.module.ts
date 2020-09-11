import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SupportDashboardComponent } from './dashboard.component';
import { ChartsComponent } from './charts/charts.component';
import { CustomerSupportComponent } from './customer-support/customer-support.component';
import { ProfileComponent } from './#profile/profile.component';
import { UserComponent } from './user/user.component';
import { SupportsComponent } from './supports/supports.component';
import { AdminsComponent } from './admins/admins.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from './order/order.component';
import { ConfigrationComponent } from './configration/configration.component';
import { CountryPriceComponent } from './country-price/country-price.component';
import { MakingOrderComponent } from './making-order/making-order.component';

const routes: Routes = [
  {
    path: '',
    component: SupportDashboardComponent,
    children: [
      {
        path: '',
        component: ChartsComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'customer-support',
        component: CustomerSupportComponent,
      },
      {
        path: 'user/:id/:type',
        component: UserComponent,
      },
      {
        path: 'supports',
        component: SupportsComponent,
      },
      {
        path: 'admins',
        component: AdminsComponent,
      },
      {
        path: 'new-order',
        component: MakingOrderComponent,
      },
      {
        path: 'orders',
        component: OrdersComponent,
      },
      {
        path: 'order/:id',
        component: OrderComponent,
      },
      {
        path: 'configurations',
        component: ConfigrationComponent,
      },
      {
        path: 'country-price',
        component: CountryPriceComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupportDashboardRoutingModule {}
