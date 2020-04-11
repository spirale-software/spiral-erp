import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleErpService } from 'app/spiral-erp/article/article-erp.service';
import { Article, IArticle } from 'app/shared/model/article.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'erp-article-update',
  templateUrl: './article-update.component.html'
})
export class ArticleUpdateComponent implements OnInit {
  titre: string | undefined;
  article: IArticle;
  articleForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private articleErpService: ArticleErpService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.articleForm = {} as FormGroup;
    this.article = {} as IArticle;
    this.createForm();
  }

  createForm(): void {
    this.articleForm = this.fb.group({
      nom: [],
      code: [],
      fournisseur: []
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.titre = 'Détail/Modification article';
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
