import { Component } from '@angular/core';

@Component({
  selector: 'erp-stock',
  templateUrl: './depense.component.html'
})
export class DepenseComponent {
  depenseList: any[];

  constructor() {
    this.depenseList = [
      { libelle: 'Achat matériel bureau', typeDepense: 'ORDINAIRE', montant: '10 000', dateDepense: '10/02/2020 à 18h00' },
      { libelle: 'Loyer', typeDepense: 'ORDINAIRE', montant: '50 000', dateDepense: '03/02/2020 à 18h00' },
      { libelle: "Réparation de l'électricité", typeDepense: 'EXTRAORDINAIRE', montant: '30 000', dateDepense: '07/06/2020 à 11h00' },
      { libelle: 'Nettoyage des locaux', typeDepense: 'ORDINAIRE', montant: '13 000', dateDepense: '10/02/2020 à 18h00' },
      { libelle: 'Achat diable', typeDepense: 'EXTRAORDINAIRE', montant: '15 000', dateDepense: '25/02/2020 à 18h00' }
    ];
  }
}
