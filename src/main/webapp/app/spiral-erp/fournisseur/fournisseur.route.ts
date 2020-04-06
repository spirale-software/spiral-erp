import { Routes } from '@angular/router';
import { FournisseurComponent } from 'app/spiral-erp/fournisseur/fournisseur.component';
import { FournisseurUpdateComponent } from 'app/spiral-erp/fournisseur/fournisseur-update.component';

export const fournisseurRoutes: Routes = [
  { path: 'fournisseurs', component: FournisseurComponent },
  { path: 'fournisseurs/:id/modifier', component: FournisseurUpdateComponent },
  { path: 'fournisseurs/ajouter', component: FournisseurUpdateComponent }
];
