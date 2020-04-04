import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AccountService } from 'app/core/auth/account.service';
import { LoginService } from 'app/core/login/login.service';
import { Router } from '@angular/router';
import { Account } from 'app/core/user/account.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'erp-main',
  templateUrl: './erp-main.component.html'
})
export class ErpMainComponent implements OnInit, OnDestroy {
  items: MenuItem[];
  display = false;
  isVisible = false;
  account: Account | null;
  authSubscription?: Subscription;

  constructor(private accountService: AccountService, private loginService: LoginService, private router: Router) {
    this.items = [];
    this.account = {} as Account;
  }

  closeSidebar = () => {
    this.display = false;
  };

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  deconnexion(): void {
    this.loginService.logout();
    this.router.navigate(['']);
  }

  setCurrentAcount(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => {
      this.account = account;
      if (this.account) {
        this.isVisible = this.accountService.hasAnyAuthority('ROLE_ADMIN');
        this.setItems();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.setCurrentAcount();
  }

  setItems(): void {
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
        visible: this.isVisible,
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