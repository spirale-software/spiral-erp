import { NgModule } from '@angular/core';
import { primengLib } from 'app/spiral-erp/shared/const/primeng-lib';
import { PanelDashboardComponent } from 'app/spiral-erp/shared/component/panel-dashboard/panel-dashboard.component';
import { FooterComponent } from 'app/spiral-erp/shared/layouts/footer/footer.component';
import { NavbarComponent } from 'app/spiral-erp/shared/layouts/navbar/navbar.component';

@NgModule({
  imports: [...primengLib],
  exports: [PanelDashboardComponent, FooterComponent],
  declarations: [PanelDashboardComponent, FooterComponent, NavbarComponent]
})
export class SharedModule {}
