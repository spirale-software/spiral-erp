import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'erp-panel-dashboard',
  templateUrl: './panel-dashboard.component.html'
})
export class PanelDashboardComponent implements OnInit {
  @Input() titre: string;
  @Input() detail: string;
  @Input() value: number;

  constructor() {
    this.titre = '';
    this.detail = '';
    this.value = 0;
  }

  ngOnInit(): void {}
}
