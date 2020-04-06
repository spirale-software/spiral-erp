import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'erp-fournisseur-update',
  templateUrl: './fournisseur-update.component.html'
})
export class FournisseurUpdateComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  back(): void {
    window.history.back();
  }
}
