import { NgModule } from '@angular/core';
import { AccueilComponent } from 'app/spiral-erp/accueil/accueil.component';
import { SpiralErpSharedModule } from 'app/shared/shared.module';
import { LoginModule } from 'app/spiral-erp/login/login.module';

@NgModule({
  imports: [SpiralErpSharedModule, LoginModule],
  declarations: [AccueilComponent],
  exports: []
})
export class AccueilModule {}
