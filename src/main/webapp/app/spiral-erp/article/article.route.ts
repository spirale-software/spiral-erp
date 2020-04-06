import { Routes } from '@angular/router';
import { ArticleComponent } from 'app/spiral-erp/article/article.component';
import { ArticleUpdateComponent } from 'app/spiral-erp/article/article-update.component';

export const articleRoutes: Routes = [
  { path: 'articles', component: ArticleComponent },
  { path: 'articles/:id/modifier', component: ArticleUpdateComponent },
  { path: 'articles/ajouter', component: ArticleUpdateComponent }
];
