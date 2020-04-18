import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { UtilisateurErpService } from 'app/spiral-erp/utilisateur/utilisateur-erp.service';
import { JhiParseLinks } from 'ng-jhipster';
import { UtilisateurErp } from 'app/spiral-erp/shared/domain/utilisateur-erp';

@Component({
  selector: 'erp-utilisateur',
  templateUrl: './utilisateur.component.html'
})
export class UtilisateurComponent implements OnInit {
  utilisateurs: UtilisateurErp[] | null;
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(private utilisateurErpService: UtilisateurErpService, protected parseLinks: JhiParseLinks) {
    this.utilisateurs = null;
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(critereTransversal?: any): void {
    this.utilisateurs = null;
    const req = {
      page: this.page,
      size: this.itemsPerPage,
      sort: this.sort()
    };
    if (critereTransversal) {
      req['critereTransversal'] = critereTransversal;
    }
    this.utilisateurErpService
      .query(req)
      .subscribe((res: HttpResponse<UtilisateurErp[]>) => this.paginateUtilisateurs(res.body, res.headers));
  }

  findAll(critereTransversal: any): void {
    this.page = 0;
    this.utilisateurs = [];
    this.loadAll(critereTransversal);
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  reset(): void {
    this.page = 0;
    this.utilisateurs = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  protected paginateUtilisateurs(data: UtilisateurErp[] | null, headers: HttpHeaders): void {
    if (!this.utilisateurs) {
      this.utilisateurs = [];
    }
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        if (this.utilisateurs) this.utilisateurs.push(data[i]);
      }
    }
  }
}
