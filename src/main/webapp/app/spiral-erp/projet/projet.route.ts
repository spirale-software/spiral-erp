import { Routes } from '@angular/router';
import { ProjetComponent } from 'app/spiral-erp/projet/projet.component';

export const projetRoutes: Routes = [
  { path: 'projets', component: ProjetComponent },
  { path: 'projets/:id/modifier', component: ProjetComponent }
];
