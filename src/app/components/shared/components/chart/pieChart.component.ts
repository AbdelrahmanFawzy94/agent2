import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pieChart.component.html',
  styleUrls: ['./pieChart.component.scss'],
})
export class PieChartComponent implements OnInit, AfterViewInit {
  chartType: ChartType = 'pie';
  chartLegendVisibility = true;
  chartOptions: ChartOptions = {
    responsive: true,
    legend: {
      labels: {
        boxWidth: 12,
        padding: 20,
        fontColor: '#222',
      },
      position: 'bottom',
      fullWidth: false,
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    },
  };

  chartColors = [
    {
      backgroundColor: [
        'rgba(255,0,0,0.3)',
        'rgba(0,255,0,0.3)',
        'rgba(0,0,255,0.3)',
        'rgba(0,188,212,0.7)',
        'rgba(233,30,99,0.7)',
        'rgba(76,175,80,0.7)',
      ],
    },
  ];

  @Input() iconBgColor: string;
  @Input() chartTitle: string;
  @Input() messageIconClass: string;
  @Input() miniMessage: string;
  @Input() chartValues: number[];
  @Input() chartLabels: Label[];

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {}
}
