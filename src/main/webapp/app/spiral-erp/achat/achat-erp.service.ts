import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { IFournisseur } from 'app/shared/model/fournisseur.model';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { IAchat } from 'app/shared/model/achat.model';
import { AchatService } from 'app/entities/achat/achat.service';

type EntityResponseType = HttpResponse<IAchat>;
type EntityArrayResponseType = HttpResponse<IAchat[]>;

@Injectable({ providedIn: 'root' })
export class AchatErpService {
  constructor(public achatJhiService: AchatService) {
    achatJhiService.resourceUrl = SERVER_API_URL + 'api/erp/achats';
  }

  create(fournisseur: IFournisseur): Observable<EntityResponseType> {
    return this.achatJhiService.create(fournisseur);
  }

  update(fournisseur: IFournisseur): Observable<EntityResponseType> {
    return this.achatJhiService.update(fournisseur);
  }

  find(id: number): Observable<EntityResponseType> {
    return this.achatJhiService.find(id);
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    return this.achatJhiService.query(req);
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.achatJhiService.delete(id);
  }
}
