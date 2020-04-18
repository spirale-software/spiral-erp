import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilisateurErpService } from 'app/spiral-erp/utilisateur/utilisateur-erp.service';
import { EntrepriseErpService } from 'app/spiral-erp/entreprise/entreprise-erp.service';
import { SelectItem } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilisateurErp } from 'app/spiral-erp/shared/domain/utilisateur-erp';
import { JhiEventManager } from 'ng-jhipster';

@Component({
  selector: 'erp-utilisateur-update',
  templateUrl: './utilisateur-update.component.html'
})
export class UtilisateurUpdateComponent implements OnInit {
  titre: string | undefined;
  entrepriseOptions: SelectItem[];
  utilisateurForm: FormGroup;
  utilisateur: UtilisateurErp;

  constructor(
    private route: ActivatedRoute,
    private utilisateurErpService: UtilisateurErpService,
    private fb: FormBuilder,
    private entrepriseErpService: EntrepriseErpService,
    private router: Router,
    private eventManager: JhiEventManager
  ) {
    this.entrepriseOptions = [];
    this.utilisateurForm = {} as FormGroup;
    this.utilisateur = {} as UtilisateurErp;
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
      email: ['', Validators.email],
      login: ['', Validators.required],
      telephone: [],
      adresse: [],
      password: [],
      actif: [],
      idEntreprise: ['', Validators.required]
    });
  }

  save(): void {
    this.utilisateur = Object.assign(this.utilisateur, this.utilisateurForm.value);
    console.log(this.utilisateur);
    if (!this.utilisateur.id) {
      this.utilisateurErpService
        .create(this.utilisateur)
        .toPromise()
        .then(() => {
          this.router.navigate(['admin/utilisateurs']);
          const summary = 'Sauvegarde réussie';
          const detail = "L'utilisateur a bien été crée";
          this.showMessage('success', summary, detail);
        })
        .catch(httpError => console.log(httpError));
    } else {
      this.utilisateurErpService
        .update(this.utilisateur)
        .toPromise()
        .then(() => {
          this.router.navigate(['admin/utilisateurs']);
          const summary = 'Mise à jour réussie.';
          const detail = "L'utilisateur a bien été mis à jour.";
          this.showMessage('success', summary, detail);
        })
        .catch(httpError => console.log(httpError));
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

  showMessage(severity: string, summary: string, detail: string): void {
    this.eventManager.broadcast({ name: 'showMessage', content: { severity, summary, detail } });
  }
}
