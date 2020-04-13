import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FournisseurErpService } from 'app/spiral-erp/fournisseur/fournisseur-erp.service';
import { IFournisseur } from 'app/shared/model/fournisseur.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'erp-fournisseur-update',
  templateUrl: './fournisseur-update.component.html'
})
export class FournisseurUpdateComponent implements OnInit {
  titre: string | undefined;
  fournisseur: IFournisseur | null;
  fournisseurForm: FormGroup;

  constructor(private route: ActivatedRoute, private fournisseurErpService: FournisseurErpService, private fb: FormBuilder) {
    this.fournisseur = {} as IFournisseur;
    this.fournisseurForm = {} as FormGroup;
    this.setFormGroup();
  }

  setFormGroup(): void {
    this.fournisseurForm = this.fb.group({
      id: [],
      nom: [],
      adresse: [],
      telephone: []
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.titre = 'Détail/Modification fournisseur';
      this.fournisseurErpService
        .find(id)
        .toPromise()
        .then(httpReponse => {
          if (httpReponse.body) {
            this.fournisseur = httpReponse.body;
            this.fournisseurForm.patchValue(this.fournisseur);
          }
        });
    } else {
      this.titre = 'Créer nouveau fournisseur';
    }
  }

  back(): void {
    window.history.back();
  }

  save(): void {
    console.log(this.fournisseurForm.value);
  }
}
