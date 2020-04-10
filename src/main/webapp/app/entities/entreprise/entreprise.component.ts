import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEntreprise } from 'app/shared/model/entreprise.model';
import { EntrepriseService } from './entreprise.service';
import { EntrepriseDeleteDialogComponent } from './entreprise-delete-dialog.component';

@Component({
  selector: 'jhi-entreprise',
  templateUrl: './entreprise.component.html'
})
export class EntrepriseComponent implements OnInit, OnDestroy {
  entreprises?: IEntreprise[];
  eventSubscriber?: Subscription;

  constructor(protected entrepriseService: EntrepriseService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.entrepriseService.query().subscribe((res: HttpResponse<IEntreprise[]>) => {
      this.entreprises = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInEntreprises();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IEntreprise): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInEntreprises(): void {
    this.eventSubscriber = this.eventManager.subscribe('entrepriseListModification', () => this.loadAll());
  }

  delete(entreprise: IEntreprise): void {
    const modalRef = this.modalService.open(EntrepriseDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.entreprise = entreprise;
  }
}
