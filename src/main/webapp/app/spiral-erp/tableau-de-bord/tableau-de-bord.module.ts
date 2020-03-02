import { NgModule } from '@angular/core';
import { primengLib } from 'app/spiral-erp/shared/primeng-lib';
import { TableauDeBordComponent } from 'app/spiral-erp/tableau-de-bord/tableau-de-bord.component';
import { SpiralErpSharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [...primengLib, SpiralErpSharedModule],
  declarations: [TableauDeBordComponent]
})
export class TableauDeBordModule {}
