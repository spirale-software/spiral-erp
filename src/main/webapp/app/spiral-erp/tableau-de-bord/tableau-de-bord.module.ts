import { NgModule } from '@angular/core';
import { primengLib } from 'app/spiral-erp/shared/const/primeng-lib';
import { TableauDeBordComponent } from 'app/spiral-erp/tableau-de-bord/tableau-de-bord.component';
import { SpiralErpSharedModule } from 'app/shared/shared.module';
import { SharedModule } from 'app/spiral-erp/shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [...primengLib, SpiralErpSharedModule, SharedModule, RouterModule],
  declarations: [TableauDeBordComponent]
})
export class TableauDeBordModule {}
