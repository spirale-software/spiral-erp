import { NgModule } from '@angular/core';
import { primengLib } from 'app/spiral-erp/shared/primeng-lib';
import { ProjetComponent } from 'app/spiral-erp/projet/projet.component';

@NgModule({
  imports: [...primengLib],
  declarations: [ProjetComponent]
})
export class ProjetModule {}
