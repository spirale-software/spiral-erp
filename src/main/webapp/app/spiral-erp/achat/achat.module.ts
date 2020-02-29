import { NgModule } from '@angular/core';
import { primengLib } from 'app/spiral-erp/shared/primeng-lib';
import { AchatComponent } from 'app/spiral-erp/achat/achat.component';

@NgModule({
  imports: [...primengLib],
  declarations: [AchatComponent]
})
export class AchatModule {}
