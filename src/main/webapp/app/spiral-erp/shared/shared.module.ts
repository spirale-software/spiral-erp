import { NgModule } from '@angular/core';
import { primengLib } from 'app/spiral-erp/shared/const/primeng-lib';
import { PanelDashboardComponent } from 'app/spiral-erp/shared/component/panel-dashboard/panel-dashboard.component';
import { FooterComponent } from 'app/spiral-erp/shared/layouts/footer/footer.component';
import { NavbarComponent } from 'app/spiral-erp/shared/layouts/navbar/navbar.component';
import { SpiralErpSharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { ActiveMenuDirective } from 'app/spiral-erp/shared/directive/active-menu.directive';
import { ErpRechercheComponent } from 'app/spiral-erp/shared/component/erp-recherche/erp-recherche.component';

@NgModule({
  imports: [...primengLib, SpiralErpSharedModule, RouterModule],
  exports: [PanelDashboardComponent, FooterComponent, NavbarComponent, ErpRechercheComponent],
  declarations: [PanelDashboardComponent, FooterComponent, NavbarComponent, ActiveMenuDirective, ErpRechercheComponent]
})
export class SharedModule {}
