import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IArticle } from 'app/shared/model/article.model';
import { ArticleService } from './article.service';
import { ArticleDeleteDialogComponent } from './article-delete-dialog.component';

@Component({
  selector: 'jhi-article',
  templateUrl: './article.component.html'
})
export class ArticleComponent implements OnInit, OnDestroy {
  articles?: IArticle[];
  eventSubscriber?: Subscription;

  constructor(protected articleService: ArticleService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.articleService.query().subscribe((res: HttpResponse<IArticle[]>) => {
      this.articles = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInArticles();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IArticle): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInArticles(): void {
    this.eventSubscriber = this.eventManager.subscribe('articleListModification', () => this.loadAll());
  }

  delete(article: IArticle): void {
    const modalRef = this.modalService.open(ArticleDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.article = article;
  }
}
