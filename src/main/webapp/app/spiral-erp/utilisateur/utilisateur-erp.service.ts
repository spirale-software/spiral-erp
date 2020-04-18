import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { Observable } from 'rxjs';
import { UtilisateurErp } from 'app/spiral-erp/shared/domain/utilisateur-erp';
import { createRequestOption } from 'app/shared/util/request-util';

type EntityResponseType = HttpResponse<UtilisateurErp>;
type EntityArrayResponseType = HttpResponse<UtilisateurErp[]>;

@Injectable({ providedIn: 'root' })
export class UtilisateurErpService {
  public resourceUrl = SERVER_API_URL + 'api/erp/utilisateurs';

  constructor(protected http: HttpClient) {}

  create(utilisateur: UtilisateurErp): Observable<EntityResponseType> {
    return this.http.post<UtilisateurErp>(this.resourceUrl, utilisateur, { observe: 'response' });
  }

  update(utilisateur: UtilisateurErp): Observable<EntityResponseType> {
    return this.http.put<UtilisateurErp>(this.resourceUrl, utilisateur, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<UtilisateurErp>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<UtilisateurErp[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
