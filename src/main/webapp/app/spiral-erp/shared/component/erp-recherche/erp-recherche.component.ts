import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'erp-recherche',
  templateUrl: './erp-recherche.component.html'
})
export class ErpRechercheComponent implements OnInit {
  @Output() onSearchClick = new EventEmitter<string>();

  critereTransversal: string | undefined;

  constructor() {}

  ngOnInit(): void {}

  emitEvent(): void {
    this.onSearchClick.emit(this.critereTransversal);
  }
}
