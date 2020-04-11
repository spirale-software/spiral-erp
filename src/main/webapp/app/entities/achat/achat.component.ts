import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAchat } from 'app/shared/model/achat.model';
import { AchatService } from './achat.service';
import { AchatDeleteDialogComponent } from './achat-delete-dialog.component';

@Component({
  selector: 'jhi-achat',
  templateUrl: './achat.component.html'
})
export class AchatComponent implements OnInit, OnDestroy {
  achats?: IAchat[];
  eventSubscriber?: Subscription;

  constructor(protected achatService: AchatService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.achatService.query().subscribe((res: HttpResponse<IAchat[]>) => {
      this.achats = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAchats();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAchat): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAchats(): void {
    this.eventSubscriber = this.eventManager.subscribe('achatListModification', () => this.loadAll());
  }

  delete(achat: IAchat): void {
    const modalRef = this.modalService.open(AchatDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.achat = achat;
  }
}
