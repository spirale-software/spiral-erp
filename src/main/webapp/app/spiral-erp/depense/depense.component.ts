import { Component, OnInit } from '@angular/core';
import { DepenseErp } from 'app/spiral-erp/shared/domain/depense-erp';
import { Subscription } from 'rxjs';
import { JhiParseLinks } from 'ng-jhipster';
import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { DepenseErpService } from 'app/spiral-erp/depense/depense-erp.service';

@Component({
  selector: 'erp-depense',
  templateUrl: './depense.component.html'
})
export class DepenseComponent implements OnInit {
  depenses: DepenseErp[] | null;
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(private depenseErpService: DepenseErpService, protected parseLinks: JhiParseLinks) {
    this.depenses = null;
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
    this.depenses = null;
    const req = {
      page: this.page,
      size: this.itemsPerPage,
      sort: this.sort()
    };
    if (critereTransversal) {
      req['critereTransversal'] = critereTransversal;
    }
    this.depenseErpService.query(req).subscribe((res: HttpResponse<DepenseErp[]>) => this.paginateDepenses(res.body, res.headers));
  }

  findAll(critereTransversal: any): void {
    this.page = 0;
    this.depenses = [];
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
    this.depenses = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  protected paginateDepenses(data: DepenseErp[] | null, headers: HttpHeaders): void {
    if (!this.depenses) {
      this.depenses = [];
    }
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        if (this.depenses) this.depenses.push(data[i]);
      }
    }
  }
}
