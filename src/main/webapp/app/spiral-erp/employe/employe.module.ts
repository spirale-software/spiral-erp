import { NgModule } from '@angular/core';
import { EmployeComponent } from 'app/spiral-erp/employe/employe.component';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  imports: [InputTextModule],
  declarations: [EmployeComponent],
  exports: []
})
export class EmployeModule {}
