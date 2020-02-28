import { Routes } from '@angular/router';
import { EmployeComponent } from 'app/spiral-erp/employe/employe.component';
import { EmployeUpdateComponent } from 'app/spiral-erp/employe/employe-update.component';

export const employeRoutes: Routes = [
  {
    path: 'employes',
    component: EmployeComponent
  },
  {
    path: 'employes/:id/modifier',
    component: EmployeUpdateComponent
  },
  {
    path: 'employes/creer',
    component: EmployeUpdateComponent
  }
];
