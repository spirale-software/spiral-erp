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

  employeOptions: any[];

  constructor() {
    this.domaineList = [];
    this.domainSelected = [];

    this.sourceList = [];
    this.targetList = [];

    this.employeOptions = [
      { label: 'Guy', value: '1' },
      { label: 'La verlosienne', value: '2' },
      { label: 'Jules', value: '3' },
      { label: 'Joseph', value: '4' },
      { label: 'Vanessa', value: '5' }
    ];
  }

  ngOnInit(): void {
    this.initDomaine();
  }

  initDomaine(): void {
    this.domaineList = [
      { id: 1, libelle: 'Gestion des achats' },
      { id: 2, libelle: 'Gestion des ventes' },
      { id: 3, libelle: 'Gestion des employés' },
      { id: 3, libelle: 'Dépense' },
      { id: 3, libelle: 'Stock' },
      { id: 3, libelle: 'Bilan' }
    ];
  }

  initSourceList(): void {
    this.sourceList = ['Visualiser', 'Creer', 'Modifier', 'Supprimer'];
  }

  chargerDroitFonctionnalites(event: any): void {
    console.log('chargerDroitFonctionnalites: ', event);
    this.initSourceList();
    this.targetList = [];
  }
}
