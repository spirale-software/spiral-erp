import { NgModule } from '@angular/core';
import { EmployeComponent } from 'app/spiral-erp/employe/employe.component';
import { SpiralErpprimengModule } from 'app/primeng/primeng.module';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  imports: [SpiralErpprimengModule, InputTextModule],
  declarations: [EmployeComponent],
  exports: []
})
export class EmployeModule {}
