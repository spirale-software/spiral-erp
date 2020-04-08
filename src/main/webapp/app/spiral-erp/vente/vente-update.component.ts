import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'erp-vente-update',
  templateUrl: './vente-update.component.html'
})
export class VenteUpdateComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  back(): void {
    window.history.back();
  }
}
