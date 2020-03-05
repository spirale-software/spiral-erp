import { NgModule } from '@angular/core';
import { GestionDroitComponent } from 'app/spiral-erp/gestion-droit/gestion-droit.component';
import { primengLib } from 'app/spiral-erp/shared/const/primeng-lib';
import { SpiralErpSharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [...primengLib, SpiralErpSharedModule],
  declarations: [GestionDroitComponent]
})
export class GestionDroitModule {}
