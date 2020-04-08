import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'erp-article-update',
  templateUrl: './article-update.component.html'
})
export class ArticleUpdateComponent implements OnInit {
  titre: string | undefined;

  constructor(private route: ActivatedRoute) {}

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
}
