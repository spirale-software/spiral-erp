import { NgModule } from '@angular/core';
import { LoginComponent } from 'app/spiral-erp/login/login.component';
import { SpiralErpSharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [SpiralErpSharedModule],
  exports: [LoginComponent],
  declarations: [LoginComponent]
})
export class LoginModuleComponent {}
