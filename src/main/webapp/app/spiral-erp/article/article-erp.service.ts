import { Injectable } from '@angular/core';
import { ArticleService } from '../../entities/article/article.service';
import { SERVER_API_URL } from '../../app.constants';
import { IArticle } from '../../shared/model/article.model';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

type EntityResponseType = HttpResponse<IArticle>;
type EntityArrayResponseType = HttpResponse<IArticle[]>;

@Injectable({ providedIn: 'root' })
export class ArticleErpService {
  constructor(public articleService: ArticleService) {
    articleService.resourceUrl = SERVER_API_URL + 'api/erp/articles';
  }

  create(article: IArticle): Observable<EntityResponseType> {
    console.log('erp-service', article);
    return this.articleService.create(article);
  }

  update(article: IArticle): Observable<EntityResponseType> {
    return this.articleService.update(article);
  }

  find(id: number): Observable<EntityResponseType> {
    return this.articleService.find(id);
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    return this.articleService.query(req);
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.articleService.delete(id);
  }
}
