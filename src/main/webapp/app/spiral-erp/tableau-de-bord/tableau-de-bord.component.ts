import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'erp-vente',
  templateUrl: './tableau-de-bord.component.html',
  styleUrls: ['./tableau-de-bord.component.scss']
})
export class TableauDeBordComponent implements OnInit {
  myData: any;
  venteList: any;

  constructor() {
    this.myData = {
      labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
      datasets: [
        {
          label: "Chiffre d'affaire",
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: "Nbre d'articles vendus",
          backgroundColor: '#9CCC65',
          borderColor: '#7CB342',
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    };

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
