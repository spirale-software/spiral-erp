import { Component, OnInit } from '@angular/core';
import { Employe } from 'app/spiral-erp/shared/domain/employe';

@Component({
  selector: 'jhi-employe',
  templateUrl: './employe.component.html'
})
export class EmployeComponent implements OnInit {
  employeList: Employe[];

  constructor() {
    this.employeList = [];
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.employeList = [
      { id: 1, email: 'aa@gmail.be', matricule: 555677898, nom: 'Gyle', prenom: 'Legy', telephone: 187800987 },
      { id: 1, email: 'aa@gmail.be', matricule: 555677898, nom: 'Gyle', prenom: 'Legy', telephone: 187800987 },
      { id: 2, email: 'aa@gmail.be', matricule: 555677898, nom: 'Gyle', prenom: 'Legy', telephone: 187800987 }
    ];
  }
}
