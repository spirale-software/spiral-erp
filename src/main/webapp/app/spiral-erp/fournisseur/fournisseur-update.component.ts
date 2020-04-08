import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'erp-fournisseur-update',
  templateUrl: './fournisseur-update.component.html'
})
export class FournisseurUpdateComponent implements OnInit {
  titre: string | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.titre = 'Détail/Modification fournisseur';
    } else {
      this.titre = 'Créer nouveau fournisseur';
    }
  }

  back(): void {
    window.history.back();
  }
}
