import { NgModule } from '@angular/core';
import { GestionDroitComponent } from 'app/spiral-erp/gestion-droit/gestion-droit.component';
import { primengLib } from 'app/spiral-erp/shared/primeng-lib';

@NgModule({
  imports: [...primengLib],
  declarations: [GestionDroitComponent]
})
export class GestionDroitModule {}
