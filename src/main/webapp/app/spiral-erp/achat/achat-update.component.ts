import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountService } from 'app/core/auth/account.service';
import { AchatErpService } from 'app/spiral-erp/achat/achat-erp.service';
import { Account } from 'app/core/user/account.model';
import { Achat } from 'app/shared/model/achat.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { SelectItem } from 'primeng/api';
import { ArticleErpService } from 'app/spiral-erp/article/article-erp.service';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

@Component({
  selector: 'erp-achat-update',
  templateUrl: './achat-update.component.html'
})
export class AchatUpdateComponent implements OnInit, OnDestroy {
  account: Account | null;
  titre: string;
  achat: Achat;
  achatForm: FormGroup;
  currentDate: string;
  articleOptions: SelectItem[];
  prixTotalAchat = 0;

  formSubscriber: Subscription | null;

  constructor(
    private accountService: AccountService,
    private achatErpService: AchatErpService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private articleErpService: ArticleErpService,
    private eventManager: JhiEventManager
  ) {
    this.account = null;
    this.titre = '';
    this.achat = {} as Achat;
    this.achatForm = {} as FormGroup;
    this.currentDate = moment().format('DD/MM/YYYY');
    this.articleOptions = [];
    this.formSubscriber = null;
    this.initForm();
  }

  ngOnInit(): void {
    this.setArticleOptions();
    this.setCurrentAccount();
    this.registerChangeInForm();
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.titre = 'Détail/Modification Achat';
      this.achatErpService
        .find(id)
        .toPromise()
        .then(httpResponse => {
          if (httpResponse.body) {
            this.achat = httpResponse.body;
            this.achatForm.patchValue(this.achat);
          }
        });
    } else {
      this.titre = 'Créer nouvel Achat';
    }
  }

  ngOnDestroy(): void {
    if (this.formSubscriber) {
      this.formSubscriber.unsubscribe();
    }
  }

  registerChangeInForm(): void {
    this.formSubscriber = this.achatForm.valueChanges.subscribe(() => this.calculerPrixTotalAchat());
  }

  calculerPrixTotalAchat(): void {
    let prixUnitaire = 0;
    let quantite = 0;
    const prixUnitaireControlForm = this.achatForm.get('prixUnitaire');
    const quantiteControlForm = this.achatForm.get('quantite');
    if (prixUnitaireControlForm && quantiteControlForm) {
      prixUnitaire = prixUnitaireControlForm.value;
      quantite = quantiteControlForm.value;
    }
    this.prixTotalAchat = prixUnitaire * quantite;
  }

  save(): void {
    this.achat = Object.assign(this.achat, this.achatForm.value);
    this.achat.acheteur = {};
    if (this.account) {
      this.achat.acheteur['login'] = this.account.login;
    }

    console.log(this.achat);
    if (!this.achat.id) {
      this.articleErpService
        .create(this.achat)
        .toPromise()
        .then(() => {
          this.router.navigate(['achats']);
          const summary = 'Sauvegarde réussie';
          const detail = "L'achat a bien été crée";
          this.showMessage('success', summary, detail);
        })
        .catch(httpError => console.log(httpError));
    } else {
      this.articleErpService
        .update(this.achat)
        .toPromise()
        .then(() => {
          this.router.navigate(['achats']);
          const summary = 'Mise à jour réussie.';
          const detail = "L'achat a bien été mis à jour.";
          this.showMessage('success', summary, detail);
        })
        .catch(httpError => console.log(httpError));
    }
  }

  showMessage(severity: string, summary: string, detail: string): void {
    this.eventManager.broadcast({ name: 'showMessage', content: { severity, summary, detail } });
  }

  initForm(): void {
    this.achatForm = this.fb.group({
      acheteur: [],
      date: [],
      article: [],
      prixUnitaire: [],
      quantite: []
    });
  }

  setArticleOptions(): void {
    this.articleErpService
      .query()
      .toPromise()
      .then(httpReponse => {
        if (httpReponse.body) {
          httpReponse.body.forEach(article => this.articleOptions.push({ label: article.nom, value: article }));
        }
      });
  }

  setCurrentAccount(): void {
    this.accountService
      .identity()
      .toPromise()
      .then(res => (this.account = res));
  }

  back(): void {
    window.history.back();
  }
}
