import { Routes } from '@angular/router';
import { EntrepriseComponent } from 'app/spiral-erp/entreprise/entreprise.component';
import { EntrepriseUpdateComponent } from 'app/spiral-erp/entreprise/entreprise-update.component';

export const entrepriseRoutes: Routes = [
  { path: 'admin/entreprises', component: EntrepriseComponent },
  { path: 'admin/entreprises/:id/modifier', component: EntrepriseUpdateComponent },
  { path: 'admin/entreprises/creer', component: EntrepriseUpdateComponent }
];
