import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IUtilisateur, Utilisateur } from 'app/shared/model/utilisateur.model';
import { UtilisateurService } from './utilisateur.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { IAudit } from 'app/shared/model/audit.model';
import { AuditService } from 'app/entities/audit/audit.service';
import { IEntreprise } from 'app/shared/model/entreprise.model';
import { EntrepriseService } from 'app/entities/entreprise/entreprise.service';

type SelectableEntity = IUser | IAudit | IEntreprise;

@Component({
  selector: 'jhi-utilisateur-update',
  templateUrl: './utilisateur-update.component.html'
})
export class UtilisateurUpdateComponent implements OnInit {
  isSaving = false;

  users: IUser[] = [];

  audits: IAudit[] = [];

  entreprises: IEntreprise[] = [];

  editForm = this.fb.group({
    id: [],
    telephone: [],
    adresse: [],
    jhiUser: [],
    audit: [],
    entreprise: []
  });

  constructor(
    protected utilisateurService: UtilisateurService,
    protected userService: UserService,
    protected auditService: AuditService,
    protected entrepriseService: EntrepriseService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ utilisateur }) => {
      this.updateForm(utilisateur);

      this.userService
        .query()
        .pipe(
          map((res: HttpResponse<IUser[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IUser[]) => (this.users = resBody));

      this.auditService
        .query({ 'utilisateurId.specified': 'false' })
        .pipe(
          map((res: HttpResponse<IAudit[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IAudit[]) => {
          if (!utilisateur.audit || !utilisateur.audit.id) {
            this.audits = resBody;
          } else {
            this.auditService
              .find(utilisateur.audit.id)
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

  updateForm(utilisateur: IUtilisateur): void {
    this.editForm.patchValue({
      id: utilisateur.id,
      telephone: utilisateur.telephone,
      adresse: utilisateur.adresse,
      jhiUser: utilisateur.jhiUser,
      audit: utilisateur.audit,
      entreprise: utilisateur.entreprise
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const utilisateur = this.createFromForm();
    if (utilisateur.id !== undefined) {
      this.subscribeToSaveResponse(this.utilisateurService.update(utilisateur));
    } else {
      this.subscribeToSaveResponse(this.utilisateurService.create(utilisateur));
    }
  }

  private createFromForm(): IUtilisateur {
    return {
      ...new Utilisateur(),
      id: this.editForm.get(['id'])!.value,
      telephone: this.editForm.get(['telephone'])!.value,
      adresse: this.editForm.get(['adresse'])!.value,
      jhiUser: this.editForm.get(['jhiUser'])!.value,
      audit: this.editForm.get(['audit'])!.value,
      entreprise: this.editForm.get(['entreprise'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUtilisateur>>): void {
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
