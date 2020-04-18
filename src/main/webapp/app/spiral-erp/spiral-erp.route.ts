import { Routes } from '@angular/router';
import { SpiralErpComponent } from 'app/spiral-erp/spiral-erp.component';
import { employeRoutes } from 'app/spiral-erp/employe/employe.route';
import { gestionDroitRoutes } from 'app/spiral-erp/gestion-droit/gestion-droit.route';
import { articleRoutes } from 'app/spiral-erp/article/article.route';
import { projetRoutes } from 'app/spiral-erp/projet/projet.route';
import { tableauDeBordRoutes } from 'app/spiral-erp/tableau-de-bord/tableau-de-bord.route';
import { venteRoutes } from 'app/spiral-erp/vente/vente.route';
import { accueilRoutes } from 'app/spiral-erp/accueil/accueil.route';
import { stockRoutes } from 'app/spiral-erp/stock/stock.route';
import { depenseRoutes } from 'app/spiral-erp/depense/depense.route';
import { bilanRoutes } from 'app/spiral-erp/bilan/bilan.route';
import { fournisseurRoutes } from 'app/spiral-erp/fournisseur/fournisseur.route';
import { achatRoutes } from 'app/spiral-erp/achat/achat.route';
import { utilisateurRoutes } from 'app/spiral-erp/utilisateur/utilisateur.route';
import { entrepriseRoutes } from 'app/spiral-erp/entreprise/entreprise.route';

export const spiraleErpRoutes: Routes = [
  {
    path: '',
    component: SpiralErpComponent,
    children: [
      ...accueilRoutes,
      ...employeRoutes,
      ...gestionDroitRoutes,
      ...articleRoutes,
      ...achatRoutes,
      ...utilisateurRoutes,
      ...entrepriseRoutes,
      ...fournisseurRoutes,
      ...projetRoutes,
      ...tableauDeBordRoutes,
      ...venteRoutes,
      ...stockRoutes,
      ...depenseRoutes,
      ...bilanRoutes
    ]
  }
];
