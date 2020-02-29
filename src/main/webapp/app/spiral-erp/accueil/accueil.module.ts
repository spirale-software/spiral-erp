import { NgModule } from '@angular/core';
import { AccueilComponent } from 'app/spiral-erp/accueil/accueil.component';
import { SpiralErpSharedModule } from 'app/shared/shared.module';
import { LoginModuleComponent } from 'app/spiral-erp/login/login.module.component';

@NgModule({
  imports: [SpiralErpSharedModule, LoginModuleComponent],
  declarations: [AccueilComponent],
  exports: []
})
export class AccueilModule {}
