import { Routes } from '@angular/router';
import { DepenseComponent } from 'app/spiral-erp/depense/depense.component';
import { DepenseUpdateComponent } from 'app/spiral-erp/depense/depense-update.component';

export const depenseRoutes: Routes = [
  { path: 'depenses', component: DepenseComponent },
  { path: 'depenses/creer', component: DepenseUpdateComponent },
  { path: 'depenses/:id/modifier', component: DepenseUpdateComponent }
];
