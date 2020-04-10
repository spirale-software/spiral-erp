import { NgModule } from '@angular/core';
import { primengLib } from 'app/spiral-erp/shared/const/primeng-lib';
import { FournisseurComponent } from 'app/spiral-erp/fournisseur/fournisseur.component';
import { FournisseurUpdateComponent } from 'app/spiral-erp/fournisseur/fournisseur-update.component';
import { SpiralErpSharedModule } from 'app/shared/shared.module';
import { SharedModule } from 'app/spiral-erp/shared/shared.module';

@NgModule({
  imports: [...primengLib, SpiralErpSharedModule, SharedModule],
  declarations: [FournisseurComponent, FournisseurUpdateComponent]
})
export class FournisseurModule {}
