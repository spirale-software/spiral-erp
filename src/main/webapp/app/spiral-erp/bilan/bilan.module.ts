import { NgModule } from '@angular/core';
import { primengLib } from 'app/spiral-erp/shared/const/primeng-lib';
import { RouterModule } from '@angular/router';
import { BilanComponent } from 'app/spiral-erp/bilan/bilan.component';

@NgModule({
  imports: [...primengLib, RouterModule],
  declarations: [BilanComponent]
})
export class BilanModule {}
