import { NgModule } from '@angular/core';

import { SupportDashboardRoutingModule } from './dashboard-routing.module';
import { ChartsComponent } from './charts/charts.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { SupportDashboardComponent } from './dashboard.component';
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
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [
    SupportDashboardComponent,
    ChartsComponent,
    CustomerSupportComponent,
    ProfileComponent,
    UserComponent,
    SupportsComponent,
    AdminsComponent,
    OrdersComponent,
    OrderComponent,
    ConfigrationComponent,
    CountryPriceComponent,
    MakingOrderComponent,
  ],
  imports: [
    CommonModule,
    SupportDashboardRoutingModule,
    SharedModule,
    GoogleMapsModule,
  ],
  providers: [],
})
export class SupportDashboardModule {}
