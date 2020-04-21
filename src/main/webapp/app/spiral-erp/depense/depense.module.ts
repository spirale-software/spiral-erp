import { NgModule } from '@angular/core';
import { primengLib } from 'app/spiral-erp/shared/const/primeng-lib';
import { RouterModule } from '@angular/router';
import { DepenseComponent } from 'app/spiral-erp/depense/depense.component';
import { DepenseUpdateComponent } from 'app/spiral-erp/depense/depense-update.component';
import { SpiralErpSharedModule } from 'app/shared/shared.module';
import { SharedModule } from 'app/spiral-erp/shared/shared.module';

@NgModule({
  imports: [...primengLib, RouterModule, SpiralErpSharedModule, SharedModule],
  declarations: [DepenseComponent, DepenseUpdateComponent]
})
export class DepenseModule {}
