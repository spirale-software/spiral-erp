import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'erp-achat',
  templateUrl: './article.component.html'
})
export class ArticleComponent implements OnInit {
  achatList: any[];

  constructor() {
    this.achatList = [
      {
        numero: '20001',
        libelle: 'Robe',
        fournisseur: 'Spiral-Mode'
      },
      {
        numero: '20002',
        libelle: 'Frigo',
        fournisseur: 'Spiral-Electro'
      },
      {
        numero: '20003',
        libelle: 'Ordinateur',
        fournisseur: 'Spiral-Electro'
      }
    ];
  }

  ngOnInit(): void {}
}
