import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DepenseErp } from 'app/spiral-erp/shared/domain/depense-erp';
import { JhiEventManager } from 'ng-jhipster';
import { DepenseErpService } from 'app/spiral-erp/depense/depense-erp.service';
import * as moment from 'moment';

@Component({
  selector: 'erp-depense-update',
  templateUrl: './depense-update.component.html'
})
export class DepenseUpdateComponent implements OnInit {
  titre: string | undefined;
  depense: DepenseErp;
  depenseForm: FormGroup;
  typeOptions: SelectItem[];
  dateDepense: string;

  constructor(
    private route: ActivatedRoute,
    private depenseErpService: DepenseErpService,
    private fb: FormBuilder,
    private router: Router,
    private eventManager: JhiEventManager
  ) {
    this.depenseForm = {} as FormGroup;
    this.depense = {} as DepenseErp;
    this.createForm();
    this.dateDepense = moment(new Date()).format('DD/MM/YYYY');
    this.typeOptions = [
      { label: 'ORDINAIRE', value: 'ORDINAIRE' },
      { label: 'EXTRAORDINAIRE', value: 'EXTRAORDINAIRE' }
    ];
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.titre = 'Détail/Modification depense';
      this.depenseErpService
        .find(id)
        .toPromise()
        .then(httpResponse => {
          if (httpResponse.body) {
            this.depense = httpResponse.body;
            this.depenseForm.patchValue(this.depense);
          }
        });
    } else {
      this.titre = 'Créer nouvel depense';
    }
  }

  createForm(): void {
    this.depenseForm = this.fb.group({
      description: [],
      typeDepense: [],
      montant: []
    });
  }

  back(): void {
    window.history.back();
  }

  save(): void {
    this.depense = Object.assign(this.depense, this.depenseForm.value);
    console.log(this.depense);
    if (!this.depense.id) {
      this.depenseErpService
        .create(this.depense)
        .toPromise()
        .then(() => {
          this.router.navigate(['depenses']);
          const summary = 'Sauvegarde réussie';
          const detail = "L'depense a bien été crée";
          this.showMessage('success', summary, detail);
        })
        .catch(httpError => console.log(httpError));
    } else {
      this.depenseErpService
        .update(this.depense)
        .toPromise()
        .then(() => {
          this.router.navigate(['depenses']);
          const summary = 'Mise à jour réussie.';
          const detail = 'La depense a bien été mis à jour.';
          this.showMessage('success', summary, detail);
        })
        .catch(httpError => console.log(httpError));
    }
  }

  showMessage(severity: string, summary: string, detail: string): void {
    this.eventManager.broadcast({ name: 'showMessage', content: { severity, summary, detail } });
  }
}
