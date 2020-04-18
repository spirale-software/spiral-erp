import { NgModule } from '@angular/core';
import { SpiralErpComponent } from 'app/spiral-erp/spiral-erp.component';
import { RouterModule } from '@angular/router';
import { spiraleErpRoutes } from 'app/spiral-erp/spiral-erp.route';
import { EmployeModule } from 'app/spiral-erp/employe/employe.module';
import { GestionDroitModule } from 'app/spiral-erp/gestion-droit/gestion-droit.module';
import { ArticleModule } from 'app/spiral-erp/article/article.module';
import { ProjetModule } from 'app/spiral-erp/projet/projet.module';
import { TableauDeBordModule } from 'app/spiral-erp/tableau-de-bord/tableau-de-bord.module';
import { VenteModule } from 'app/spiral-erp/vente/vente.module';
import { AccueilModule } from 'app/spiral-erp/accueil/accueil.module';
import { SharedModule } from 'app/spiral-erp/shared/shared.module';
import { StockModule } from 'app/spiral-erp/stock/stock.module';
import { DepenseModule } from 'app/spiral-erp/depense/depense.module';
import { BilanModule } from 'app/spiral-erp/bilan/bilan.module';
import { FournisseurModule } from 'app/spiral-erp/fournisseur/fournisseur.module';
import { AchatModule } from 'app/spiral-erp/achat/achat.module';
import { UtilisateurModule } from 'app/spiral-erp/utilisateur/utilisateur.module';
import { EntrepriseModule } from 'app/spiral-erp/entreprise/entreprise.module';

@NgModule({
  imports: [
    RouterModule.forChild(spiraleErpRoutes),
    EmployeModule,
    GestionDroitModule,
    ArticleModule,
    AchatModule,
    FournisseurModule,
    ProjetModule,
    TableauDeBordModule,
    VenteModule,
    AccueilModule,
    SharedModule,
    StockModule,
    DepenseModule,
    BilanModule,
    UtilisateurModule,
    EntrepriseModule
  ],
  declarations: [SpiralErpComponent],
  exports: [RouterModule]
})
export class SpiralErpModule {}
