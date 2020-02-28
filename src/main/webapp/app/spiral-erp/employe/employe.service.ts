import { Injectable } from '@angular/core';
import { Employe } from 'app/spiral-erp/shared/domain/employe';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

type EntityResponseType = any;
type EntityArrayResponseType = any;

@Injectable({ providedIn: 'root' })
export class EmployeService {
  private url = 'api/spiral-erp/employes';

  constructor(protected http: HttpClient) {}

  query(req?: any): void {}

  create(employe: Employe): void {}

  update(employe: Employe): void {}

  delete(id: number): void {}
}
