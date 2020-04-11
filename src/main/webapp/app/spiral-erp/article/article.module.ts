import { NgModule } from '@angular/core';
import { primengLib } from 'app/spiral-erp/shared/const/primeng-lib';
import { ArticleComponent } from 'app/spiral-erp/article/article.component';
import { ArticleUpdateComponent } from 'app/spiral-erp/article/article-update.component';
import { SharedModule } from 'app/spiral-erp/shared/shared.module';
import { SpiralErpSharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [...primengLib, SharedModule, SpiralErpSharedModule],
  declarations: [ArticleComponent, ArticleUpdateComponent]
})
export class ArticleModule {}
