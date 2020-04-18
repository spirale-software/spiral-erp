import { Injectable } from '@angular/core';
import { SERVER_API_URL } from '../../app.constants';
import { IEntreprise } from '../../shared/model/entreprise.model';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { EntrepriseService } from 'app/entities/entreprise/entreprise.service';

type EntityResponseType = HttpResponse<IEntreprise>;
type EntityArrayResponseType = HttpResponse<IEntreprise[]>;

@Injectable({ providedIn: 'root' })
export class EntrepriseErpService {
  constructor(public entrepriseService: EntrepriseService) {
    entrepriseService.resourceUrl = SERVER_API_URL + 'api/erp/entreprises';
  }

  create(entreprise: IEntreprise): Observable<EntityResponseType> {
    console.log('erp-service', entreprise);
    return this.entrepriseService.create(entreprise);
  }

  update(entreprise: IEntreprise): Observable<EntityResponseType> {
    return this.entrepriseService.update(entreprise);
  }

  find(id: number): Observable<EntityResponseType> {
    return this.entrepriseService.find(id);
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    return this.entrepriseService.query(req);
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.entrepriseService.delete(id);
  }
}
