import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'erp-vente',
  templateUrl: './tableau-de-bord.component.html',
  styleUrls: ['./tableau-de-bord.component.scss']
})
export class TableauDeBordComponent implements OnInit {
  data: any;
  chiffreAffaireData: any;

  constructor() {
    this.data = {
      labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
      datasets: [
        {
          label: 'Nombre de produits vendus dans la semaine',
          backgroundColor: '#55ACEE',
          borderColor: '#1E88E5',
          data: [65, 59, 80, 81, 56, 55, 40]
        }
      ]
    };
    this.chiffreAffaireData = {
      labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
      datasets: [
        {
          label: "Chiffre d'affaire de la semaine",
          backgroundColor: '#66757F',
          borderColor: '#66757F',
          data: [65, 59, 80, 81, 56, 55, 40]
        }
      ]
    };
  }

  ngOnInit(): void {}
}
