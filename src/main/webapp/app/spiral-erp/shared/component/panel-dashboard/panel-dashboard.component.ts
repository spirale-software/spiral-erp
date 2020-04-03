import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'erp-panel-dashboard',
  templateUrl: './panel-dashboard.component.html'
})
export class PanelDashboardComponent implements OnInit, AfterViewInit {
  @Input() titre: string;
  @Input() detail: string;
  @Input() value: number;
  @Input() backgroundColor = '#00A1F1';

  style: any;

  constructor() {
    this.titre = '';
    this.detail = '';
    this.value = 0;
  }

  ngAfterViewInit(): void {
    // this.style = { 'background-color': this.backgroundColor };
  }

  ngOnInit(): void {
    this.style = { 'background-color': this.backgroundColor };
  }
}
