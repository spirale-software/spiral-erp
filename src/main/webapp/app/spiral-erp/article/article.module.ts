import { NgModule } from '@angular/core';
import { primengLib } from 'app/spiral-erp/shared/const/primeng-lib';
import { ArticleComponent } from 'app/spiral-erp/article/article.component';
import { ArticleUpdateComponent } from 'app/spiral-erp/article/article-update.component';

@NgModule({
  imports: [...primengLib],
  declarations: [ArticleComponent, ArticleUpdateComponent]
})
export class ArticleModule {}
