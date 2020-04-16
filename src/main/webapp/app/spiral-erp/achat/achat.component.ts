import { Component, OnInit } from '@angular/core';
import { AchatErpService } from 'app/spiral-erp/achat/achat-erp.service';
import { JhiParseLinks } from 'ng-jhipster';
import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { Achat } from 'app/shared/model/achat.model';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { IAudit } from 'app/shared/model/audit.model';

@Component({
  selector: 'erp-achat',
  templateUrl: './achat.component.html'
})
export class AchatComponent implements OnInit {
  achats: Achat[] | null;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(private achatErpService: AchatErpService, protected parseLinks: JhiParseLinks) {
    this.achats = null;
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
    this.achats = null;
    const req = {
      page: this.page,
      size: this.itemsPerPage,
      sort: this.sort()
    };
    if (critereTransversal) {
      req['critereTransversal'] = critereTransversal;
    }
    this.achatErpService.query(req).subscribe((res: HttpResponse<IAudit[]>) => this.paginateAchats(res.body, res.headers));
  }

  findAll(critereTransversal: any): void {
    this.page = 0;
    this.achats = [];
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
    this.achats = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  protected paginateAchats(data: IAudit[] | null, headers: HttpHeaders): void {
    if (!this.achats) {
      this.achats = [];
    }
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        if (this.achats) this.achats.push(data[i]);
      }
    }
  }
}
