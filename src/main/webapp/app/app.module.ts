import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { SpiralErpSharedModule } from 'app/shared/shared.module';
import { SpiralErpCoreModule } from 'app/core/core.module';
import { SpiralErpAppRoutingModule } from './app-routing.module';
import { SpiralErpEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';
import { SpiralErpModule } from 'app/spiral-erp/spiral-erp.module';
import { SharedModule } from 'app/spiral-erp/shared/shared.module';
import { ErpMainComponent } from 'app/spiral-erp/shared/layouts/main/erp-main.component';
import { MainComponent } from 'app/layouts/main/main.component';
import { primengLib } from 'app/spiral-erp/shared/const/primeng-lib';
import { LoginModule } from 'app/spiral-erp/login/login.module';

@NgModule({
  imports: [
    ...primengLib,
    BrowserModule,
    SpiralErpSharedModule,
    SpiralErpCoreModule,
    //  SpiralErpHomeModule,
    SpiralErpModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    SpiralErpEntityModule,
    SpiralErpAppRoutingModule,
    SharedModule,
    LoginModule
  ],
  declarations: [
    ErpMainComponent,
    MainComponent,
    NavbarComponent,
    ErrorComponent,
    PageRibbonComponent,
    ActiveMenuDirective,
    FooterComponent
  ],
  exports: [ActiveMenuDirective],
  bootstrap: [ErpMainComponent]
})
export class SpiralErpAppModule {}
