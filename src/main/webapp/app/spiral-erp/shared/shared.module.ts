import { NgModule } from '@angular/core';
import { primengLib } from 'app/spiral-erp/shared/const/primeng-lib';
import { PanelDashboardComponent } from 'app/spiral-erp/shared/component/panel-dashboard/panel-dashboard.component';

@NgModule({
  imports: [...primengLib],
  exports: [PanelDashboardComponent],
  declarations: [PanelDashboardComponent]
})
export class SharedModule {}
