import { NgModule } from '@angular/core';
import { primengLib } from 'app/spiral-erp/shared/primeng-lib';
import { VenteComponent } from 'app/spiral-erp/vente/vente.component';

@NgModule({
  imports: [...primengLib],
  declarations: [VenteComponent]
})
export class VenteModule {}
