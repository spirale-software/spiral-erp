import { NgModule } from '@angular/core';
import { primengLib } from 'app/spiral-erp/shared/const/primeng-lib';
import { RouterModule } from '@angular/router';
import { StockComponent } from 'app/spiral-erp/stock/stock.component';

@NgModule({
  imports: [...primengLib, RouterModule],
  declarations: [StockComponent]
})
export class StockModule {}
