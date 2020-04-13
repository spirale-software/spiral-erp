import { Component, OnInit } from '@angular/core';
import { FournisseurErpService } from 'app/spiral-erp/fournisseur/fournisseur-erp.service';
import { IArticle } from 'app/shared/model/article.model';
import { Subscription } from 'rxjs';
import { JhiParseLinks } from 'ng-jhipster';
import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { IAudit } from 'app/shared/model/audit.model';
import { IFournisseur } from 'app/shared/model/fournisseur.model';

@Component({
  selector: 'erp-fournisseur',
  templateUrl: './fournisseur.component.html'
})
export class FournisseurComponent implements OnInit {
  fournisseurs: IArticle[] | null;
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(private fournisseurErpService: FournisseurErpService, protected parseLinks: JhiParseLinks) {
    this.fournisseurs = [];
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
    const req = {
      page: this.page,
      size: this.itemsPerPage,
      sort: this.sort()
    };
    if (critereTransversal) {
      req['critereTransversal'] = critereTransversal;
    }
    this.fournisseurErpService.query(req).subscribe((res: HttpResponse<IAudit[]>) => this.paginateFournisseurs(res.body, res.headers));
  }

  findAll(critereTransversal: any): void {
    this.page = 0;
    this.fournisseurs = [];
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
    this.fournisseurs = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  protected paginateFournisseurs(data: IFournisseur[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        if (this.fournisseurs) this.fournisseurs.push(data[i]);
      }
    }
  }
}
