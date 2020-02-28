import { Component, OnInit } from '@angular/core';
import { Employe } from 'app/spiral-erp/shared/domain/employe';
import { EmployeService } from 'app/spiral-erp/employe/employe.service';
import { ActivatedRoute } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { Fonction } from 'app/spiral-erp/shared/domain/fonction';

@Component({
  selector: 'jhi-employe-update',
  templateUrl: './employe-update.component.html',
  styles: ['.form-group {margin-bottom: 10px }']
})
export class EmployeUpdateComponent implements OnInit {
  employe: Employe;
  fonctionOptions: SelectItem[];

  constructor(protected employeService: EmployeService, protected route: ActivatedRoute) {
    this.employe = {} as Employe;
    this.initArrayFonction();
  }

  ngOnInit(): void {
    const idEmploye = this.route.snapshot.params.id;
    this.getById(idEmploye);
  }

  back(): void {
    window.history.back();
  }

  getById(id: number): void {
    console.log('getById: ', id);
  }

  save(): void {
    // this.employeService.create(this.employe);
  }

  initArrayFonction() {
    this.fonctionOptions = [
      { label: Fonction.EMPLOYE, value: Fonction.EMPLOYE },
      { label: Fonction.MANAGER, value: Fonction.MANAGER },
      { label: Fonction.GESTIONNAIRE, value: Fonction.GESTIONNAIRE },
      { label: Fonction.RESPONSABLE, value: Fonction.RESPONSABLE }
    ];
  }
}
