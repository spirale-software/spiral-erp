import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { JhiParseLinks } from 'ng-jhipster';
import { EntrepriseErpService } from 'app/spiral-erp/entreprise/entreprise-erp.service';
import { IEntreprise } from 'app/shared/model/entreprise.model';
import * as moment from 'moment';
import { IAudit } from 'app/shared/model/audit.model';

@Component({
  selector: 'erp-article',
  templateUrl: './entreprise.component.html'
})
export class EntrepriseComponent implements OnInit {
  entreprises: IEntreprise[] | null;
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(private entrepriseService: EntrepriseErpService, protected parseLinks: JhiParseLinks) {
    this.entreprises = null;
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
    this.entreprises = null;
    const req = {
      page: this.page,
      size: this.itemsPerPage,
      sort: this.sort()
    };
    if (critereTransversal) {
      req['critereTransversal'] = critereTransversal;
    }
    this.entrepriseService.query(req).subscribe((res: HttpResponse<IEntreprise[]>) => this.paginateEntreprises(res.body, res.headers));
  }

  findAll(critereTransversal: any): void {
    this.page = 0;
    this.entreprises = [];
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
    this.entreprises = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  protected paginateEntreprises(data: IEntreprise[] | null, headers: HttpHeaders): void {
    if (!this.entreprises) {
      this.entreprises = [];
    }
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        if (this.entreprises) this.entreprises.push(data[i]);
      }
    }
  }

  getFormattedDate(audit: IAudit): string {
    return audit ? moment(audit.createdAt).format('DD/MM/YYYY') : '';
  }
}