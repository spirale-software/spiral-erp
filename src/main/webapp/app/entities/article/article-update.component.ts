import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IArticle, Article } from 'app/shared/model/article.model';
import { ArticleService } from './article.service';
import { IAudit } from 'app/shared/model/audit.model';
import { AuditService } from 'app/entities/audit/audit.service';
import { IFournisseur } from 'app/shared/model/fournisseur.model';
import { FournisseurService } from 'app/entities/fournisseur/fournisseur.service';
import { IEntreprise } from 'app/shared/model/entreprise.model';
import { EntrepriseService } from 'app/entities/entreprise/entreprise.service';

type SelectableEntity = IAudit | IFournisseur | IEntreprise;

@Component({
  selector: 'jhi-article-update',
  templateUrl: './article-update.component.html'
})
export class ArticleUpdateComponent implements OnInit {
  isSaving = false;

  audits: IAudit[] = [];

  fournisseurs: IFournisseur[] = [];

  entreprises: IEntreprise[] = [];

  editForm = this.fb.group({
    id: [],
    nom: [null, [Validators.required]],
    code: [],
    numero: [],
    audit: [],
    fournisseur: [],
    entreprise: []
  });

  constructor(
    protected articleService: ArticleService,
    protected auditService: AuditService,
    protected fournisseurService: FournisseurService,
    protected entrepriseService: EntrepriseService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ article }) => {
      this.updateForm(article);

      this.auditService
        .query({ 'articleId.specified': 'false' })
        .pipe(
          map((res: HttpResponse<IAudit[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IAudit[]) => {
          if (!article.audit || !article.audit.id) {
            this.audits = resBody;
          } else {
            this.auditService
              .find(article.audit.id)
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

      this.fournisseurService
        .query()
        .pipe(
          map((res: HttpResponse<IFournisseur[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IFournisseur[]) => (this.fournisseurs = resBody));

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

  updateForm(article: IArticle): void {
    this.editForm.patchValue({
      id: article.id,
      nom: article.nom,
      code: article.code,
      numero: article.numero,
      audit: article.audit,
      fournisseur: article.fournisseur,
      entreprise: article.entreprise
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const article = this.createFromForm();
    if (article.id !== undefined) {
      this.subscribeToSaveResponse(this.articleService.update(article));
    } else {
      this.subscribeToSaveResponse(this.articleService.create(article));
    }
  }

  private createFromForm(): IArticle {
    return {
      ...new Article(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      code: this.editForm.get(['code'])!.value,
      numero: this.editForm.get(['numero'])!.value,
      audit: this.editForm.get(['audit'])!.value,
      fournisseur: this.editForm.get(['fournisseur'])!.value,
      entreprise: this.editForm.get(['entreprise'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IArticle>>): void {
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