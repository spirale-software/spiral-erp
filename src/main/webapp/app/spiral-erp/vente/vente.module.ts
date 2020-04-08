import { NgModule } from '@angular/core';
import { primengLib } from 'app/spiral-erp/shared/const/primeng-lib';
import { VenteComponent } from 'app/spiral-erp/vente/vente.component';
import { RouterModule } from '@angular/router';
import { VenteUpdateComponent } from 'app/spiral-erp/vente/vente-update.component';

@NgModule({
  imports: [...primengLib, RouterModule],
  declarations: [VenteComponent, VenteUpdateComponent]
})
export class VenteModule {}
