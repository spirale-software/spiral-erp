import { Injectable } from '@angular/core';
import { SERVER_API_URL } from '../../app.constants';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { FournisseurService } from 'app/entities/fournisseur/fournisseur.service';
import { IFournisseur } from 'app/shared/model/fournisseur.model';

type EntityResponseType = HttpResponse<IFournisseur>;
type EntityArrayResponseType = HttpResponse<IFournisseur[]>;

@Injectable({ providedIn: 'root' })
export class FournisseurErpService {
  constructor(public fournisseurJhiService: FournisseurService) {
    fournisseurJhiService.resourceUrl = SERVER_API_URL + 'api/erp/fournisseurs';
  }

  create(fournisseur: IFournisseur): Observable<EntityResponseType> {
    return this.fournisseurJhiService.create(fournisseur);
  }

  update(fournisseur: IFournisseur): Observable<EntityResponseType> {
    return this.fournisseurJhiService.update(fournisseur);
  }

  find(id: number): Observable<EntityResponseType> {
    return this.fournisseurJhiService.find(id);
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    return this.fournisseurJhiService.query(req);
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.fournisseurJhiService.delete(id);
  }
}
