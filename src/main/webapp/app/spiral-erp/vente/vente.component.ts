import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'erp-vente',
  templateUrl: './vente.component.html'
})
export class VenteComponent implements OnInit {
  venteList: any[];

  constructor() {
    this.venteList = [
      {
        prixVente: '25 000',
        libelleProduit: 'Robe',
        numeroProduit: '0012376',
        typeProduit: 'Occasion',
        vendeur: 'Gyle',
        dateVente: '10/02/2020 à 11h00'
      },
      {
        prixVente: '50 000',
        libelleProduit: 'Chaussure',
        numeroProduit: '0019976',
        typeProduit: 'Friperie',
        vendeur: 'Casimir',
        dateVente: '11/02/2020 à 18h23'
      },
      {
        prixVente: '100 000',
        libelleProduit: 'Ballot de chemise',
        numeroProduit: '9019976',
        typeProduit: 'Friperie',
        vendeur: 'Casimir',
        dateVente: '11/02/2020 à 18h23'
      },
      {
        prixVente: '55 000',
        libelleProduit: 'Chaussure',
        numeroProduit: '0019976',
        typeProduit: 'Ballot',
        vendeur: 'Sergeo',
        dateVente: '11/02/2020 à 18h23'
      },
      {
        prixVente: '1 525 000',
        libelleProduit: 'Ballot',
        numeroProduit: '1012376',
        typeProduit: 'Semi-gros',
        vendeur: 'Ashanti',
        dateVente: '18/02/2020 à 14h00'
      }
    ];
  }

  ngOnInit(): void {}
}
