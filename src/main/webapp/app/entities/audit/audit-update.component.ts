import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IAudit, Audit } from 'app/shared/model/audit.model';
import { AuditService } from './audit.service';

@Component({
  selector: 'jhi-audit-update',
  templateUrl: './audit-update.component.html'
})
export class AuditUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    createdAt: [],
    modifiedAt: []
  });

  constructor(protected auditService: AuditService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ audit }) => {
      this.updateForm(audit);
    });
  }

  updateForm(audit: IAudit): void {
    this.editForm.patchValue({
      id: audit.id,
      createdAt: audit.createdAt != null ? audit.createdAt.format(DATE_TIME_FORMAT) : null,
      modifiedAt: audit.modifiedAt != null ? audit.modifiedAt.format(DATE_TIME_FORMAT) : null
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const audit = this.createFromForm();
    if (audit.id !== undefined) {
      this.subscribeToSaveResponse(this.auditService.update(audit));
    } else {
      this.subscribeToSaveResponse(this.auditService.create(audit));
    }
  }

  private createFromForm(): IAudit {
    return {
      ...new Audit(),
      id: this.editForm.get(['id'])!.value,
      createdAt:
        this.editForm.get(['createdAt'])!.value != null ? moment(this.editForm.get(['createdAt'])!.value, DATE_TIME_FORMAT) : undefined,
      modifiedAt:
        this.editForm.get(['modifiedAt'])!.value != null ? moment(this.editForm.get(['modifiedAt'])!.value, DATE_TIME_FORMAT) : undefined
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAudit>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
