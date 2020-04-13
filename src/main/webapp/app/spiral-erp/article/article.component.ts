import { Component, OnInit } from '@angular/core';
import { ArticleErpService } from 'app/spiral-erp/article/article-erp.service';
import { IArticle } from 'app/shared/model/article.model';
import { Subscription } from 'rxjs';
import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { IAudit } from 'app/shared/model/audit.model';
import { JhiParseLinks } from 'ng-jhipster';

@Component({
  selector: 'erp-article',
  templateUrl: './article.component.html'
})
export class ArticleComponent implements OnInit {
  articles: IArticle[] | null;
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(private aricleService: ArticleErpService, protected parseLinks: JhiParseLinks) {
    this.articles = null;
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
    this.aricleService.query(req).subscribe((res: HttpResponse<IAudit[]>) => this.paginateArticles(res.body, res.headers));
  }

  findAll(critereTransversal: any): void {
    this.page = 0;
    this.articles = [];
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
    this.articles = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  protected paginateArticles(data: IAudit[] | null, headers: HttpHeaders): void {
    if (!this.articles) {
      this.articles = [];
    }
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        if (this.articles) this.articles.push(data[i]);
      }
    }
  }
}
