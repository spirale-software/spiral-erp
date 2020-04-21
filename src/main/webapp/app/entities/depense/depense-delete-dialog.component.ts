import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDepense } from 'app/shared/model/depense.model';
import { DepenseService } from './depense.service';

@Component({
  templateUrl: './depense-delete-dialog.component.html'
})
export class DepenseDeleteDialogComponent {
  depense?: IDepense;

  constructor(protected depenseService: DepenseService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.depenseService.delete(id).subscribe(() => {
      this.eventManager.broadcast('depenseListModification');
      this.activeModal.close();
    });
  }
}
