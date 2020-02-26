import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'jhi-employe-update',
  templateUrl: './employe-update.component.html',
  styles: ['.form-group {margin-bottom: 10px }']
})
export class EmployeUpdateComponent implements OnInit {
  constructor(protected fb: FormBuilder) {}

  ngOnInit(): void {}

  retourner(): void {
    window.history.back();
  }

  sauver(): void {}
}
