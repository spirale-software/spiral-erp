import { Routes } from '@angular/router';
import { VenteComponent } from 'app/spiral-erp/vente/vente.component';
import { VenteUpdateComponent } from 'app/spiral-erp/vente/vente-update.component';

export const venteRoutes: Routes = [
  { path: 'ventes', component: VenteComponent },
  { path: 'ventes/creer', component: VenteUpdateComponent }
];
