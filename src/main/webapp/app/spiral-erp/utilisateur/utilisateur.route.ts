import { Routes } from '@angular/router';
import { UtilisateurComponent } from 'app/spiral-erp/utilisateur/utilisateur.component';
import { UtilisateurUpdateComponent } from 'app/spiral-erp/utilisateur/utilisateur-update.component';

export const utilisateurRoutes: Routes = [
  { path: 'admin/utilisateurs', component: UtilisateurComponent },
  { path: 'admin/utilisateurs/creer', component: UtilisateurUpdateComponent },
  { path: 'admin/utilisateurs/:id/modifier', component: UtilisateurUpdateComponent }
];
