import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SpiralErpSharedModule } from 'app/shared/shared.module';
import { AchatComponent } from './achat.component';
import { AchatDetailComponent } from './achat-detail.component';
import { AchatUpdateComponent } from './achat-update.component';
import { AchatDeleteDialogComponent } from './achat-delete-dialog.component';
import { achatRoute } from './achat.route';

@NgModule({
  imports: [SpiralErpSharedModule, RouterModule.forChild(achatRoute)],
  declarations: [AchatComponent, AchatDetailComponent, AchatUpdateComponent, AchatDeleteDialogComponent],
  entryComponents: [AchatDeleteDialogComponent]
})
export class SpiralErpAchatModule {}
