import { NgModule } from '@angular/core';
import { EmployeComponent } from 'app/spiral-erp/employe/employe.component';
import { EmployeUpdateComponent } from 'app/spiral-erp/employe/employe-update.component';
import { primengLib } from 'app/spiral-erp/shared/primeng-lib';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [...primengLib, CommonModule, RouterModule],
  declarations: [EmployeComponent, EmployeUpdateComponent],
  exports: []
})
export class EmployeModule {}
