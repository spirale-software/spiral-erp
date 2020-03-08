import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'erp-main',
  templateUrl: './erp-main.component.html'
})
export class ErpMainComponent implements OnInit {
  items: MenuItem[];
  display = false;

  constructor() {
    this.items = [];
  }

  ngOnInit(): void {
    this.items = [
      {
        label: '',
        items: [{ label: 'Tableau de bord', icon: 'pi pi-chart-bar' }]
      },
      {
        label: "Gestion d'entreprise",
        items: [
          { label: 'Achat', icon: 'pi pi-fw pi-shopping-cart' },
          { label: 'Vente', icon: 'pi pi-dollar' },
          { label: 'Dépense', icon: 'pi pi-minus' }
        ]
      },
      {
        label: 'Gestion de projet',
        items: [{ label: 'Projet', icon: 'pi pi-fw pi-share-alt' }]
      },
      {
        label: 'Employés',
        items: [
          { label: 'Gestion des employés', icon: 'pi pi-users' },
          { label: 'Gestion des droits et accès', icon: 'pi pi-user-plus' }
        ]
      },
      {
        label: 'Comptabilité',
        items: [
          { label: 'Stocks', icon: 'pi pi-home' },
          { label: 'Bilan', icon: 'pi pi-table' }
        ]
      }
    ];
  }
}
