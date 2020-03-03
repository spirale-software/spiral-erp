import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { SpiralErpSharedModule } from 'app/shared/shared.module';
import { SpiralErpCoreModule } from 'app/core/core.module';
import { SpiralErpAppRoutingModule } from './app-routing.module';
import { SpiralErpEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';
import { SpiralErpModule } from 'app/spiral-erp/spiral-erp.module';
import { SharedModule } from 'app/spiral-erp/shared/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    SpiralErpSharedModule,
    SpiralErpCoreModule,
    //  SpiralErpHomeModule,
    SpiralErpModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    SpiralErpEntityModule,
    SpiralErpAppRoutingModule,
    SharedModule
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  exports: [ActiveMenuDirective],
  bootstrap: [MainComponent]
})
export class SpiralErpAppModule {}
