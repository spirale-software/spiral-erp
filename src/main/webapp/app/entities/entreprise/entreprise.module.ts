import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SpiralErpSharedModule } from 'app/shared/shared.module';
import { EntrepriseComponent } from './entreprise.component';
import { EntrepriseDetailComponent } from './entreprise-detail.component';
import { EntrepriseUpdateComponent } from './entreprise-update.component';
import { EntrepriseDeleteDialogComponent } from './entreprise-delete-dialog.component';
import { entrepriseRoute } from './entreprise.route';

@NgModule({
  imports: [SpiralErpSharedModule, RouterModule.forChild(entrepriseRoute)],
  declarations: [EntrepriseComponent, EntrepriseDetailComponent, EntrepriseUpdateComponent, EntrepriseDeleteDialogComponent],
  entryComponents: [EntrepriseDeleteDialogComponent]
})
export class SpiralErpEntrepriseModule {}
