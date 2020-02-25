import { Routes } from '@angular/router';
import { SpiralErpComponent } from 'app/spiral-erp/spiral-erp.component';
import { employeRoutes } from 'app/spiral-erp/employe/employe.route';

export const spiraleErpRoutes: Routes = [
  {
    path: '',
    component: SpiralErpComponent,
    children: [...employeRoutes]
  }
];
