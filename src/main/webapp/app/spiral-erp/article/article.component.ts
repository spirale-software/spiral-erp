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
        prixAchat: '25 000',
        libelleProduit: 'Robe',
        numeroProduit: '0012376',
        typeProduit: 'Occasion',
        acheteur: 'Gyle',
        dateAchat: '10/02/2020'
      },
      {
        prixAchat: '50 000',
        libelleProduit: 'Chaussure',
        numeroProduit: '0019976',
        typeProduit: 'Friperie',
        acheteur: 'Casimir',
        dateAchat: '11/02/2020'
      },
      {
        prixAchat: '1 525 000',
        libelleProduit: 'Ballot',
        numeroProduit: '1012376',
        typeProduit: 'Semi-gros',
        acheteur: 'Ashanti',
        dateAchat: '18/02/2020'
      }
    ];
  }

  ngOnInit(): void {}
}
