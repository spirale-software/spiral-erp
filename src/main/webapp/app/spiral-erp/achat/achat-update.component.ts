import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'erp-achat-update',
  templateUrl: './achat-update.component.html'
})
export class AchatUpdateComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  back(): void {
    window.history.back();
  }
}
