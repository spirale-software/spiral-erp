import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilisateurErpService } from 'app/spiral-erp/utilisateur/utilisateur-erp.service';
import { EntrepriseErpService } from 'app/spiral-erp/entreprise/entreprise-erp.service';
import { SelectItem } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'erp-utilisateur-update',
  templateUrl: './utilisateur-update.component.html'
})
export class UtilisateurUpdateComponent implements OnInit {
  titre: string | undefined;
  entrepriseOptions: SelectItem[];
  utilisateurForm: FormGroup | null;

  constructor(
    private route: ActivatedRoute,
    private utilisateurErpService: UtilisateurErpService,
    private fb: FormBuilder,
    private entrepriseErpService: EntrepriseErpService
  ) {
    this.entrepriseOptions = [];
    this.utilisateurForm = null;
    this.initForm();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.titre = 'Détail/Modification utilisateur';
    } else {
      this.titre = 'Créer une nouvel utilisateur';
    }
  }

  back(): void {
    window.history.back();
  }

  initForm(): void {
    this.utilisateurForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: [],
      login: ['', Validators.required],
      telephone: [],
      adresse: [],
      password: [],
      actif: [],
      idEntreprise: ['', Validators.required]
    });
  }

  save(): void {
    if (this.utilisateurForm) {
      console.log(this.utilisateurForm.value);
    }
  }

  setEntrepriseOptions(): void {
    if (this.entrepriseOptions.length === 0) {
      this.entrepriseErpService
        .query()
        .toPromise()
        .then(httpReponse => {
          if (httpReponse.body) {
            httpReponse.body.forEach(item => this.entrepriseOptions.push({ label: item.nom, value: item.id }));
          }
        });
    }
  }
}
