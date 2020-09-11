import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  @Input() header: string;
  @Input() headerIconClass: string;
  @Input() headerColorClass: string;
  @Input() value: string;
  @Input() valueColorClass: string;
  @Input() messageIconClass: string;
  @Input() messageIconColorClass: string;
  @Input() message: string;

  constructor() {}

  ngOnInit(): void {}

  headerIconClasses() {
    return `${this.headerIconClass} ${this.headerColorClass}`;
  }

  messaageIconClasses() {
    return `${this.messageIconClass} ${this.messageIconColorClass}`;
  }
}
