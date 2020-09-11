import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { PieChartComponent } from './components/chart/pieChart.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { SvgLogoComponent } from './components/svg-logo/svg-logo.component';
import { LoginSvgLogoComponent } from './components/login-svg-logo/login-svg-logo.component';

@NgModule({
  declarations: [
    PieChartComponent,
    StatisticsComponent,
    SvgLogoComponent,
    LoginSvgLogoComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    PieChartComponent,
    StatisticsComponent,
    SvgLogoComponent,
    LoginSvgLogoComponent,
  ],
  providers: [],
})
export class SharedModule {}
