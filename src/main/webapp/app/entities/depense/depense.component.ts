import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDepense } from 'app/shared/model/depense.model';
import { DepenseService } from './depense.service';
import { DepenseDeleteDialogComponent } from './depense-delete-dialog.component';

@Component({
  selector: 'jhi-depense',
  templateUrl: './depense.component.html'
})
export class DepenseComponent implements OnInit, OnDestroy {
  depenses?: IDepense[];
  eventSubscriber?: Subscription;

  constructor(protected depenseService: DepenseService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.depenseService.query().subscribe((res: HttpResponse<IDepense[]>) => {
      this.depenses = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDepenses();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDepense): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDepenses(): void {
    this.eventSubscriber = this.eventManager.subscribe('depenseListModification', () => this.loadAll());
  }

  delete(depense: IDepense): void {
    const modalRef = this.modalService.open(DepenseDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.depense = depense;
  }
}
