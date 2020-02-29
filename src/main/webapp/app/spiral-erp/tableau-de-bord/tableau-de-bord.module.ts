import { NgModule } from '@angular/core';
import { primengLib } from 'app/spiral-erp/shared/primeng-lib';
import { TableauDeBordComponent } from 'app/spiral-erp/tableau-de-bord/tableau-de-bord.component';

@NgModule({
  imports: [...primengLib],
  declarations: [TableauDeBordComponent]
})
export class TableauDeBordModule {}
