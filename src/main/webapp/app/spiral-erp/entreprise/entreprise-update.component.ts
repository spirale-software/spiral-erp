import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntrepriseErpService } from 'app/spiral-erp/entreprise/entreprise-erp.service';
import { IEntreprise } from 'app/shared/model/entreprise.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { JhiEventManager } from 'ng-jhipster';

@Component({
  selector: 'erp-entreprise-update',
  templateUrl: './entreprise-update.component.html'
})
export class EntrepriseUpdateComponent implements OnInit {
  titre: string | undefined;
  entreprise: IEntreprise;
  entrepriseForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private entrepriseErpService: EntrepriseErpService,
    private fb: FormBuilder,
    private router: Router,
    private eventManager: JhiEventManager
  ) {
    this.entrepriseForm = {} as FormGroup;
    this.entreprise = {} as IEntreprise;
    this.createForm();
  }

  createForm(): void {
    this.entrepriseForm = this.fb.group({
      nom: [],
      actif: []
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.titre = 'Détail/Modification entreprise';
      this.entrepriseErpService
        .find(id)
        .toPromise()
        .then(httpResponse => {
          if (httpResponse.body) {
            this.entreprise = httpResponse.body;
            this.entrepriseForm.patchValue(this.entreprise);
          }
        });
    } else {
      this.titre = 'Créer nouvel entreprise';
    }
  }

  back(): void {
    window.history.back();
  }

  save(): void {
    this.entreprise = Object.assign(this.entreprise, this.entrepriseForm.value);
    console.log(this.entreprise);
    if (!this.entreprise.id) {
      this.entrepriseErpService
        .create(this.entreprise)
        .toPromise()
        .then(() => {
          this.router.navigate(['admin/entreprises']);
          const summary = 'Sauvegarde réussie';
          const detail = "L'entreprise a bien été crée";
          this.showMessage('success', summary, detail);
        })
        .catch(httpError => console.log(httpError));
    } else {
      this.entrepriseErpService
        .update(this.entreprise)
        .toPromise()
        .then(() => {
          this.router.navigate(['admin/entreprises']);
          const summary = 'Mise à jour réussie.';
          const detail = "L'entreprise a bien été mis à jour.";
          this.showMessage('success', summary, detail);
        })
        .catch(httpError => console.log(httpError));
    }
  }

  showMessage(severity: string, summary: string, detail: string): void {
    this.eventManager.broadcast({ name: 'showMessage', content: { severity, summary, detail } });
  }
}
