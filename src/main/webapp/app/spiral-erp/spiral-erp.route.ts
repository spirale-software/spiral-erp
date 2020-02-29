import { Routes } from '@angular/router';
import { SpiralErpComponent } from 'app/spiral-erp/spiral-erp.component';
import { employeRoutes } from 'app/spiral-erp/employe/employe.route';
import { gestionDroitRoutes } from 'app/spiral-erp/gestion-droit/gestion-droit.route';
import { achatRoutes } from 'app/spiral-erp/achat/achat.route';
import { projetRoutes } from 'app/spiral-erp/projet/projet.route';
import { tableauDeBordRoutes } from 'app/spiral-erp/tableau-de-bord/tableau-de-bord.route';
import { venteRoutes } from 'app/spiral-erp/vente/vente.route';

export const spiraleErpRoutes: Routes = [
  {
    path: '',
    component: SpiralErpComponent,
    children: [...employeRoutes, ...gestionDroitRoutes, ...achatRoutes, ...projetRoutes, ...tableauDeBordRoutes, ...venteRoutes]
  }
];
