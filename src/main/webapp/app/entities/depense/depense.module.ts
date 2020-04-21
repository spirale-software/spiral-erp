import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SpiralErpSharedModule } from 'app/shared/shared.module';
import { DepenseComponent } from './depense.component';
import { DepenseDetailComponent } from './depense-detail.component';
import { DepenseUpdateComponent } from './depense-update.component';
import { DepenseDeleteDialogComponent } from './depense-delete-dialog.component';
import { depenseRoute } from './depense.route';

@NgModule({
  imports: [SpiralErpSharedModule, RouterModule.forChild(depenseRoute)],
  declarations: [DepenseComponent, DepenseDetailComponent, DepenseUpdateComponent, DepenseDeleteDialogComponent],
  entryComponents: [DepenseDeleteDialogComponent]
})
export class SpiralErpDepenseModule {}
