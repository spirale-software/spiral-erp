import { NgModule } from '@angular/core';
import { primengLib } from 'app/spiral-erp/shared/const/primeng-lib';
import { RouterModule } from '@angular/router';
import { UtilisateurComponent } from 'app/spiral-erp/utilisateur/utilisateur.component';
import { UtilisateurUpdateComponent } from 'app/spiral-erp/utilisateur/utilisateur-update.component';
import { SpiralErpSharedModule } from 'app/shared/shared.module';
import { SharedModule } from 'app/spiral-erp/shared/shared.module';

@NgModule({
  imports: [...primengLib, RouterModule, SpiralErpSharedModule, SharedModule],
  declarations: [UtilisateurComponent, UtilisateurUpdateComponent]
})
export class UtilisateurModule {}
