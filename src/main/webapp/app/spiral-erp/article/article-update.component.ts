import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleErpService } from 'app/spiral-erp/article/article-erp.service';
import { IArticle } from 'app/shared/model/article.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { FournisseurErpService } from 'app/spiral-erp/fournisseur/fournisseur-erp.service';

@Component({
  selector: 'erp-article-update',
  templateUrl: './article-update.component.html'
})
export class ArticleUpdateComponent implements OnInit {
  titre: string | undefined;
  article: IArticle;
  articleForm: FormGroup;
  fournisseurOptions: SelectItem[];

  constructor(
    private route: ActivatedRoute,
    private articleErpService: ArticleErpService,
    private fournisseurErpService: FournisseurErpService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.articleForm = {} as FormGroup;
    this.article = {} as IArticle;
    this.fournisseurOptions = [{ label: '', value: null }];
    this.createForm();
    this.setFournisseurOptions();
  }

  createForm(): void {
    this.articleForm = this.fb.group({
      nom: [this.article.nom],
      code: [this.article.code],
      fournisseur: []
    });
  }

  setFournisseurOptions(): void {
    this.fournisseurErpService
      .query()
      .toPromise()
      .then(httpReponse => {
        if (httpReponse.body) {
          httpReponse.body.forEach(item => this.fournisseurOptions.push({ label: item.nom, value: item }));
        }
      })
      .catch(httpError => console.log(httpError));
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.titre = 'Détail/Modification article';
      this.articleErpService
        .find(id)
        .toPromise()
        .then(httpResponse => {
          if (httpResponse.body) {
            this.article = httpResponse.body;
            this.articleForm.patchValue(this.article);
          }
        });
    } else {
      this.titre = 'Créer nouvel article';
    }
  }

  back(): void {
    window.history.back();
  }

  save(): void {
    this.article = Object.assign(this.article, this.articleForm.value);
    console.log(this.article);
    this.articleErpService
      .create(this.article)
      .toPromise()
      .then(() => this.router.navigate(['articles']))
      .catch(httpError => console.log(httpError));
  }
}
