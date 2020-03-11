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
    console.log('innerWidth: ', window.innerWidth);
  }

  isLargeScreen(): boolean {
    return window.innerWidth > 1024;
  }

  ngOnInit(): void {
    this.items = [
      {
        label: '',
        items: [{ label: 'Tableau de bord', icon: 'pi pi-chart-bar', routerLink: 'tableau-de-bord' }]
      },
      {
        label: "Gestion d'entreprise",
        items: [
          { label: 'Achat', icon: 'pi pi-fw pi-shopping-cart', routerLink: 'achats' },
          { label: 'Vente', icon: 'pi pi-dollar', routerLink: 'ventes' },
          { label: 'Dépense', icon: 'pi pi-minus', routerLink: 'depenses' }
        ]
      },
      {
        label: 'Gestion de projet',
        items: [{ label: 'Projet', icon: 'pi pi-fw pi-share-alt', routerLink: 'projets' }]
      },
      {
        label: 'Employés',
        items: [
          { label: 'Gestion des employés', icon: 'pi pi-users', routerLink: 'employes' },
          { label: 'Gestion des droits et accès', icon: 'pi pi-user-plus', routerLink: 'gestion-des-droits' }
        ]
      },
      {
        label: 'Comptabilité',
        items: [
          { label: 'Stocks', icon: 'pi pi-home', routerLink: 'stocks' },
          { label: 'Bilan', icon: 'pi pi-table', routerLink: 'bilans' }
        ]
      }
    ];
  }
}
