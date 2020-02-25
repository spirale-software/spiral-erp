import { NgModule } from '@angular/core';
import { SpiralErpComponent } from 'app/spiral-erp/spiral-erp.component';
import { RouterModule } from '@angular/router';
import { spiraleErpRoutes } from 'app/spiral-erp/spiral-erp.route';
import { EmployeModule } from 'app/spiral-erp/employe/employe.module';

@NgModule({
  imports: [RouterModule.forChild(spiraleErpRoutes), EmployeModule],
  declarations: [SpiralErpComponent],
  exports: [RouterModule]
})
export class SpiralErpModule {}
