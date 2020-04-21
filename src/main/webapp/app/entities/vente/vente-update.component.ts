import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IVente, Vente } from 'app/shared/model/vente.model';
import { VenteService } from './vente.service';
import { IAudit } from 'app/shared/model/audit.model';
import { AuditService } from 'app/entities/audit/audit.service';
import { IUtilisateur } from 'app/shared/model/utilisateur.model';
import { UtilisateurService } from 'app/entities/utilisateur/utilisateur.service';
import { IArticle } from 'app/shared/model/article.model';
import { ArticleService } from 'app/entities/article/article.service';
import { IEntreprise } from 'app/shared/model/entreprise.model';
import { EntrepriseService } from 'app/entities/entreprise/entreprise.service';

type SelectableEntity = IAudit | IUtilisateur | IArticle | IEntreprise;

@Component({
  selector: 'jhi-vente-update',
  templateUrl: './vente-update.component.html'
})
export class VenteUpdateComponent implements OnInit {
  isSaving = false;

  audits: IAudit[] = [];

  utilisateurs: IUtilisateur[] = [];

  articles: IArticle[] = [];

  entreprises: IEntreprise[] = [];

  editForm = this.fb.group({
    id: [],
    tauxTVA: [],
    quantiteVendu: [],
    prixUnitaireVente: [],
    audit: [],
    vendeur: [],
    article: [],
    entreprise: []
  });

  constructor(
    protected venteService: VenteService,
    protected auditService: AuditService,
    protected utilisateurService: UtilisateurService,
    protected articleService: ArticleService,
    protected entrepriseService: EntrepriseService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ vente }) => {
      this.updateForm(vente);

      this.auditService
        .query({ 'venteId.specified': 'false' })
        .pipe(
          map((res: HttpResponse<IAudit[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IAudit[]) => {
          if (!vente.audit || !vente.audit.id) {
            this.audits = resBody;
          } else {
            this.auditService
              .find(vente.audit.id)
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

      this.utilisateurService
        .query()
        .pipe(
          map((res: HttpResponse<IUtilisateur[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IUtilisateur[]) => (this.utilisateurs = resBody));

      this.articleService
        .query()
        .pipe(
          map((res: HttpResponse<IArticle[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IArticle[]) => (this.articles = resBody));

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

  updateForm(vente: IVente): void {
    this.editForm.patchValue({
      id: vente.id,
      tauxTVA: vente.tauxTVA,
      quantiteVendu: vente.quantiteVendu,
      prixUnitaireVente: vente.prixUnitaireVente,
      audit: vente.audit,
      vendeur: vente.vendeur,
      article: vente.article,
      entreprise: vente.entreprise
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const vente = this.createFromForm();
    if (vente.id !== undefined) {
      this.subscribeToSaveResponse(this.venteService.update(vente));
    } else {
      this.subscribeToSaveResponse(this.venteService.create(vente));
    }
  }

  private createFromForm(): IVente {
    return {
      ...new Vente(),
      id: this.editForm.get(['id'])!.value,
      tauxTVA: this.editForm.get(['tauxTVA'])!.value,
      quantiteVendu: this.editForm.get(['quantiteVendu'])!.value,
      prixUnitaireVente: this.editForm.get(['prixUnitaireVente'])!.value,
      audit: this.editForm.get(['audit'])!.value,
      vendeur: this.editForm.get(['vendeur'])!.value,
      article: this.editForm.get(['article'])!.value,
      entreprise: this.editForm.get(['entreprise'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVente>>): void {
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
