import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SpiralErpSharedModule } from 'app/shared/shared.module';
import { AuditComponent } from './audit.component';
import { AuditDetailComponent } from './audit-detail.component';
import { AuditUpdateComponent } from './audit-update.component';
import { AuditDeleteDialogComponent } from './audit-delete-dialog.component';
import { auditRoute } from './audit.route';

@NgModule({
  imports: [SpiralErpSharedModule, RouterModule.forChild(auditRoute)],
  declarations: [AuditComponent, AuditDetailComponent, AuditUpdateComponent, AuditDeleteDialogComponent],
  entryComponents: [AuditDeleteDialogComponent]
})
export class SpiralErpAuditModule {}
