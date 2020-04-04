import { NgModule } from '@angular/core';
import { primengLib } from 'app/spiral-erp/shared/const/primeng-lib';
import { RouterModule } from '@angular/router';
import { BilanComponent } from 'app/spiral-erp/bilan/bilan.component';
import { SpiralErpSharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [...primengLib, RouterModule, SpiralErpSharedModule],
  declarations: [BilanComponent]
})
export class BilanModule {}
