import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IEntreprise, Entreprise } from 'app/shared/model/entreprise.model';
import { EntrepriseService } from './entreprise.service';
import { IAudit } from 'app/shared/model/audit.model';
import { AuditService } from 'app/entities/audit/audit.service';

@Component({
  selector: 'jhi-entreprise-update',
  templateUrl: './entreprise-update.component.html'
})
export class EntrepriseUpdateComponent implements OnInit {
  isSaving = false;

  audits: IAudit[] = [];

  editForm = this.fb.group({
    id: [],
    nom: [null, [Validators.required]],
    audit: []
  });

  constructor(
    protected entrepriseService: EntrepriseService,
    protected auditService: AuditService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ entreprise }) => {
      this.updateForm(entreprise);

      this.auditService
        .query({ 'entrepriseId.specified': 'false' })
        .pipe(
          map((res: HttpResponse<IAudit[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IAudit[]) => {
          if (!entreprise.audit || !entreprise.audit.id) {
            this.audits = resBody;
          } else {
            this.auditService
              .find(entreprise.audit.id)
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
    });
  }

  updateForm(entreprise: IEntreprise): void {
    this.editForm.patchValue({
      id: entreprise.id,
      nom: entreprise.nom,
      audit: entreprise.audit
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const entreprise = this.createFromForm();
    if (entreprise.id !== undefined) {
      this.subscribeToSaveResponse(this.entrepriseService.update(entreprise));
    } else {
      this.subscribeToSaveResponse(this.entrepriseService.create(entreprise));
    }
  }

  private createFromForm(): IEntreprise {
    return {
      ...new Entreprise(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      audit: this.editForm.get(['audit'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEntreprise>>): void {
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

  trackById(index: number, item: IAudit): any {
    return item.id;
  }
}
