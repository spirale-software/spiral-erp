import { NgModule } from '@angular/core';
import { SpiralErpComponent } from 'app/spiral-erp/spiral-erp.component';
import { RouterModule } from '@angular/router';
import { spiraleErpRoutes } from 'app/spiral-erp/spiral-erp.route';
import { EmployeModule } from 'app/spiral-erp/employe/employe.module';
import { GestionDroitModule } from 'app/spiral-erp/gestion-droit/gestion-droit.module';

@NgModule({
  imports: [RouterModule.forChild(spiraleErpRoutes), EmployeModule, GestionDroitModule],
  declarations: [SpiralErpComponent],
  exports: [RouterModule]
})
export class SpiralErpModule {}
