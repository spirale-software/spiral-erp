import { NgModule } from '@angular/core';
import { primengLib } from 'app/spiral-erp/shared/const/primeng-lib';
import { PanelDashboardComponent } from 'app/spiral-erp/shared/component/panel-dashboard/panel-dashboard.component';
import { FooterComponent } from 'app/spiral-erp/shared/layouts/footer/footer.component';
import { NavbarComponent } from 'app/spiral-erp/shared/layouts/navbar/navbar.component';
import { SpiralErpSharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { SpiralErpAppModule } from 'app/app.module';
import { ActiveMenuDirective } from 'app/spiral-erp/shared/directive/active-menu.directive';

@NgModule({
  imports: [...primengLib, SpiralErpSharedModule, RouterModule],
  exports: [PanelDashboardComponent, FooterComponent, NavbarComponent],
  declarations: [PanelDashboardComponent, FooterComponent, NavbarComponent, ActiveMenuDirective]
})
export class SharedModule {}
