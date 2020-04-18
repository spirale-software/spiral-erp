import { NgModule } from '@angular/core';
import { primengLib } from 'app/spiral-erp/shared/const/primeng-lib';
import { SharedModule } from 'app/spiral-erp/shared/shared.module';
import { SpiralErpSharedModule } from 'app/shared/shared.module';
import { EntrepriseComponent } from 'app/spiral-erp/entreprise/entreprise.component';
import { EntrepriseUpdateComponent } from 'app/spiral-erp/entreprise/entreprise-update.component';

@NgModule({
  imports: [...primengLib, SharedModule, SpiralErpSharedModule],
  declarations: [EntrepriseComponent, EntrepriseUpdateComponent]
})
export class EntrepriseModule {}
