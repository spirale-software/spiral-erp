import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IVente } from 'app/shared/model/vente.model';
import { VenteService } from './vente.service';
import { VenteDeleteDialogComponent } from './vente-delete-dialog.component';

@Component({
  selector: 'jhi-vente',
  templateUrl: './vente.component.html'
})
export class VenteComponent implements OnInit, OnDestroy {
  ventes?: IVente[];
  eventSubscriber?: Subscription;

  constructor(protected venteService: VenteService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.venteService.query().subscribe((res: HttpResponse<IVente[]>) => {
      this.ventes = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInVentes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IVente): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInVentes(): void {
    this.eventSubscriber = this.eventManager.subscribe('venteListModification', () => this.loadAll());
  }

  delete(vente: IVente): void {
    const modalRef = this.modalService.open(VenteDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.vente = vente;
  }
}
