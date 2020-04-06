import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'erp-fournisseur',
  templateUrl: './fournisseur.component.html'
})
export class FournisseurComponent implements OnInit {
  fournisseurList: any[];

  constructor() {
    this.fournisseurList = [
      {
        numero: '1234',
        nom: 'Spiral-media',
        telephone: '003212376',
        adresse: 'Rue des sympa 42'
      },
      {
        numero: '1568',
        nom: 'Spiral-Agri',
        telephone: '003212376',
        adresse: 'Rue des sympa 42'
      },
      {
        numero: '9876',
        nom: 'Spiral-Training',
        telephone: '003212376',
        adresse: 'Rue des juifs 42'
      }
    ];
  }

  ngOnInit(): void {}
}
