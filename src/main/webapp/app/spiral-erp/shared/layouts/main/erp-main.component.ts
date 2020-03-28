import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AccountService } from 'app/core/auth/account.service';
import { OverlayPanel } from 'primeng/overlaypanel';

@Component({
  selector: 'erp-main',
  templateUrl: './erp-main.component.html'
})
export class ErpMainComponent implements OnInit {
  items: MenuItem[];
  display = false;

  constructor(private accountService: AccountService) {
    this.items = [];
  }

  closeSidebar = () => {
    this.display = false;
  };

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  ngOnInit(): void {
    this.items = [
      {
        label: '',
        items: [{ label: 'Tableau de bord', icon: 'pi pi-chart-bar', routerLink: 'tableau-de-bord', command: this.closeSidebar }]
      },
      {
        label: "Gestion d'entreprise",
        items: [
          { label: 'Achat', icon: 'pi pi-fw pi-shopping-cart', routerLink: 'achats', command: this.closeSidebar },
          { label: 'Vente', icon: 'pi pi-dollar', routerLink: 'ventes', command: this.closeSidebar },
          { label: 'Dépense', icon: 'pi pi-minus', routerLink: 'depenses', command: this.closeSidebar }
        ]
      },
      {
        label: 'Gestion de projet',
        items: [{ label: 'Projet', icon: 'pi pi-fw pi-share-alt', routerLink: 'projets', command: this.closeSidebar }]
      },
      {
        label: 'Employés',
        items: [
          { label: 'Gestion des employés', icon: 'pi pi-users', routerLink: 'employes', command: this.closeSidebar },
          { label: 'Gestion des droits et accès', icon: 'pi pi-user-plus', routerLink: 'gestion-des-droits', command: this.closeSidebar }
        ]
      },
      {
        label: 'Comptabilité',
        items: [
          { label: 'Stocks', icon: 'pi pi-home', routerLink: 'stocks', command: this.closeSidebar },
          { label: 'Bilan', icon: 'pi pi-table', routerLink: 'bilans', command: this.closeSidebar }
        ]
      },
      {
        label: 'Administration',
        items: [
          { label: 'Gestion des utilisateurs', icon: 'pi pi-user', routerLink: 'admin/user-management', command: this.closeSidebar },
          { label: 'Métriques', icon: 'pi pi-th-large', routerLink: 'admin/metrics', command: this.closeSidebar },
          { label: 'Diagnostics', icon: 'pi pi-star-o', routerLink: 'admin/health', command: this.closeSidebar },
          { label: 'Configuration', icon: 'pi pi-list', routerLink: 'admin/configuration', command: this.closeSidebar },
          { label: 'Audits', icon: 'pi pi-bell', routerLink: 'admin/audits', command: this.closeSidebar },
          { label: 'Logs', icon: 'pi pi-align-justify', routerLink: 'admin/logs', command: this.closeSidebar },
          { label: 'API', icon: 'pi pi-table', routerLink: 'admin/docs', command: this.closeSidebar }
        ]
      }
    ];
  }
}
