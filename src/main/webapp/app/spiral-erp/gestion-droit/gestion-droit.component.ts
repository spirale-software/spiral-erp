import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'erp-gestion-droit',
  templateUrl: './gestion-droit.component.html'
})
export class GestionDroitComponent implements OnInit {
  domaineList: any[];
  domainSelected: any[];

  sourceList: any[];
  targetList: any[];

  constructor() {
    this.domaineList = [];
    this.domainSelected = [];

    this.sourceList = [];
    this.targetList = [];
  }

  ngOnInit(): void {
    this.initDomaine();
    this.initSourceList();
  }

  initDomaine() {
    this.domaineList = [
      { id: 1, libelle: 'Achat' },
      { id: 2, libelle: 'Vente' },
      { id: 3, libelle: 'Employe' }
    ];
  }

  initSourceList() {
    this.sourceList = ['Visualiser', 'Creer', 'Modifier', 'Supprimer'];
  }
}
