import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit {
  chartType: ChartType = 'pie';
  chartValues: number[] = [300, 500, 200];
  chartLabels: Label[] = [['Download'], ['Sales', 'Mail Sales'], 'Mail Sales'];
  chartLegendVisibility = true;

  constructor() {}

  ngOnInit(): void {}
}
