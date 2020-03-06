import { NgModule } from '@angular/core';
import { primengLib } from 'app/spiral-erp/shared/const/primeng-lib';
import { RouterModule } from '@angular/router';
import { DepenseComponent } from 'app/spiral-erp/depense/depense.component';

@NgModule({
  imports: [...primengLib, RouterModule],
  declarations: [DepenseComponent]
})
export class DepenseModule {}
