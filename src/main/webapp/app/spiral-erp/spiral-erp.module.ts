import { NgModule } from '@angular/core';
import { SpiralErpComponent } from 'app/spiral-erp/spiral-erp.component';
import { RouterModule } from '@angular/router';
import { spiraleErpRoutes } from 'app/spiral-erp/spiral-erp.route';
import { EmployeModule } from 'app/spiral-erp/employe/employe.module';
import { GestionDroitModule } from 'app/spiral-erp/gestion-droit/gestion-droit.module';
import { AchatModule } from 'app/spiral-erp/achat/achat.module';
import { ProjetModule } from 'app/spiral-erp/projet/projet.module';
import { TableauDeBordModule } from 'app/spiral-erp/tableau-de-bord/tableau-de-bord.module';
import { VenteModule } from 'app/spiral-erp/vente/vente.module';
import { AccueilModule } from 'app/spiral-erp/accueil/accueil.module';

@NgModule({
  imports: [
    RouterModule.forChild(spiraleErpRoutes),
    EmployeModule,
    GestionDroitModule,
    AchatModule,
    ProjetModule,
    TableauDeBordModule,
    VenteModule,
    AccueilModule
  ],
  declarations: [SpiralErpComponent],
  exports: [RouterModule]
})
export class SpiralErpModule {}
