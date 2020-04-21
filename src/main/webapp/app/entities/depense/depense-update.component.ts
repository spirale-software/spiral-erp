import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IDepense, Depense } from 'app/shared/model/depense.model';
import { DepenseService } from './depense.service';
import { IAudit } from 'app/shared/model/audit.model';
import { AuditService } from 'app/entities/audit/audit.service';
import { IEntreprise } from 'app/shared/model/entreprise.model';
import { EntrepriseService } from 'app/entities/entreprise/entreprise.service';

type SelectableEntity = IAudit | IEntreprise;

@Component({
  selector: 'jhi-depense-update',
  templateUrl: './depense-update.component.html'
})
export class DepenseUpdateComponent implements OnInit {
  isSaving = false;

  audits: IAudit[] = [];

  entreprises: IEntreprise[] = [];

  editForm = this.fb.group({
    id: [],
    description: [],
    typeDepense: [],
    montant: [],
    audit: [],
    entreprise: []
  });

  constructor(
    protected depenseService: DepenseService,
    protected auditService: AuditService,
    protected entrepriseService: EntrepriseService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ depense }) => {
      this.updateForm(depense);

      this.auditService
        .query({ 'depenseId.specified': 'false' })
        .pipe(
          map((res: HttpResponse<IAudit[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IAudit[]) => {
          if (!depense.audit || !depense.audit.id) {
            this.audits = resBody;
          } else {
            this.auditService
              .find(depense.audit.id)
              .pipe(
                map((subRes: HttpResponse<IAudit>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IAudit[]) => {
                this.audits = concatRes;
              });
          }
        });

      this.entrepriseService
        .query()
        .pipe(
          map((res: HttpResponse<IEntreprise[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IEntreprise[]) => (this.entreprises = resBody));
    });
  }

  updateForm(depense: IDepense): void {
    this.editForm.patchValue({
      id: depense.id,
      description: depense.description,
      typeDepense: depense.typeDepense,
      montant: depense.montant,
      audit: depense.audit,
      entreprise: depense.entreprise
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const depense = this.createFromForm();
    if (depense.id !== undefined) {
      this.subscribeToSaveResponse(this.depenseService.update(depense));
    } else {
      this.subscribeToSaveResponse(this.depenseService.create(depense));
    }
  }

  private createFromForm(): IDepense {
    return {
      ...new Depense(),
      id: this.editForm.get(['id'])!.value,
      description: this.editForm.get(['description'])!.value,
      typeDepense: this.editForm.get(['typeDepense'])!.value,
      montant: this.editForm.get(['montant'])!.value,
      audit: this.editForm.get(['audit'])!.value,
      entreprise: this.editForm.get(['entreprise'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDepense>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
