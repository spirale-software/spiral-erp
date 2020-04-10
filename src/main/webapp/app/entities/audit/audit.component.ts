import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAudit } from 'app/shared/model/audit.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { AuditService } from './audit.service';
import { AuditDeleteDialogComponent } from './audit-delete-dialog.component';

@Component({
  selector: 'jhi-audit',
  templateUrl: './audit.component.html'
})
export class AuditComponent implements OnInit, OnDestroy {
  audits: IAudit[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected auditService: AuditService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.audits = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.auditService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IAudit[]>) => this.paginateAudits(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.audits = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAudits();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAudit): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAudits(): void {
    this.eventSubscriber = this.eventManager.subscribe('auditListModification', () => this.reset());
  }

  delete(audit: IAudit): void {
    const modalRef = this.modalService.open(AuditDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.audit = audit;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateAudits(data: IAudit[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.audits.push(data[i]);
      }
    }
  }
}
