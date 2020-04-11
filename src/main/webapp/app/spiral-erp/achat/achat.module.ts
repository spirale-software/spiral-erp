import { NgModule } from '@angular/core';
import { primengLib } from 'app/spiral-erp/shared/const/primeng-lib';
import { RouterModule } from '@angular/router';
import { AchatComponent } from 'app/spiral-erp/achat/achat.component';
import { AchatUpdateComponent } from 'app/spiral-erp/achat/achat-update.component';
import { SpiralErpSharedModule } from 'app/shared/shared.module';
import { SharedModule } from 'app/spiral-erp/shared/shared.module';

@NgModule({
  imports: [...primengLib, RouterModule, SpiralErpSharedModule, SharedModule],
  declarations: [AchatComponent, AchatUpdateComponent]
})
export class AchatModule {}
