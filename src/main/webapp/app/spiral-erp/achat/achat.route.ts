import { Routes } from '@angular/router';
import { AchatComponent } from 'app/spiral-erp/achat/achat.component';
import { AchatUpdateComponent } from 'app/spiral-erp/achat/achat-update.component';

export const achatRoutes: Routes = [
  { path: 'achats', component: AchatComponent },
  { path: 'achats/creer', component: AchatUpdateComponent }
];
