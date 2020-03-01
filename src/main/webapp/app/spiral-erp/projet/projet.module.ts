import { NgModule } from '@angular/core';
import { primengLib } from 'app/spiral-erp/shared/primeng-lib';
import { ProjetComponent } from 'app/spiral-erp/projet/projet.component';
import { ProjetUpdateComponent } from 'app/spiral-erp/projet/projet-update.component';
import { SpiralErpSharedModule } from 'app/shared/shared.module';
import { TacheUpdateComponent } from 'app/spiral-erp/projet/tache/tache-update.component';

@NgModule({
  imports: [...primengLib, SpiralErpSharedModule],
  declarations: [ProjetComponent, ProjetUpdateComponent, TacheUpdateComponent]
})
export class ProjetModule {}
