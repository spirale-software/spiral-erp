import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IAchat, Achat } from 'app/shared/model/achat.model';
import { AchatService } from './achat.service';
import { IAudit } from 'app/shared/model/audit.model';
import { AuditService } from 'app/entities/audit/audit.service';
import { IEntreprise } from 'app/shared/model/entreprise.model';
import { EntrepriseService } from 'app/entities/entreprise/entreprise.service';

type SelectableEntity = IAudit | IEntreprise;

@Component({
  selector: 'jhi-achat-update',
  templateUrl: './achat-update.component.html'
})
export class AchatUpdateComponent implements OnInit {
  isSaving = false;

  audits: IAudit[] = [];

  entreprises: IEntreprise[] = [];

  editForm = this.fb.group({
    id: [],
    dateAchat: [],
    prixUnitaire: [],
    quantite: [],
    audit: [],
    entreprise: []
  });

  constructor(
    protected achatService: AchatService,
    protected auditService: AuditService,
    protected entrepriseService: EntrepriseService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ achat }) => {
      this.updateForm(achat);

      this.auditService
        .query({ filter: 'achat-is-null' })
        .pipe(
          map((res: HttpResponse<IAudit[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IAudit[]) => {
          if (!achat.audit || !achat.audit.id) {
            this.audits = resBody;
          } else {
            this.auditService
              .find(achat.audit.id)
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

  updateForm(achat: IAchat): void {
    this.editForm.patchValue({
      id: achat.id,
      dateAchat: achat.dateAchat != null ? achat.dateAchat.format(DATE_TIME_FORMAT) : null,
      prixUnitaire: achat.prixUnitaire,
      quantite: achat.quantite,
      audit: achat.audit,
      entreprise: achat.entreprise
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const achat = this.createFromForm();
    if (achat.id !== undefined) {
      this.subscribeToSaveResponse(this.achatService.update(achat));
    } else {
      this.subscribeToSaveResponse(this.achatService.create(achat));
    }
  }

  private createFromForm(): IAchat {
    return {
      ...new Achat(),
      id: this.editForm.get(['id'])!.value,
      dateAchat:
        this.editForm.get(['dateAchat'])!.value != null ? moment(this.editForm.get(['dateAchat'])!.value, DATE_TIME_FORMAT) : undefined,
      prixUnitaire: this.editForm.get(['prixUnitaire'])!.value,
      quantite: this.editForm.get(['quantite'])!.value,
      audit: this.editForm.get(['audit'])!.value,
      entreprise: this.editForm.get(['entreprise'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAchat>>): void {
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
