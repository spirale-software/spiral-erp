import { SERVER_API_URL } from 'app/app.constants';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { DepenseErp } from 'app/spiral-erp/shared/domain/depense-erp';
import { createRequestOption } from 'app/shared/util/request-util';
import { Injectable } from '@angular/core';

type EntityResponseType = HttpResponse<DepenseErp>;
type EntityArrayResponseType = HttpResponse<DepenseErp[]>;

@Injectable({ providedIn: 'root' })
export class DepenseErpService {
  public resourceUrl = SERVER_API_URL + 'api/erp/depenses';

  constructor(protected http: HttpClient) {}

  create(depense: DepenseErp): Observable<EntityResponseType> {
    return this.http.post<DepenseErp>(this.resourceUrl, depense, { observe: 'response' });
  }

  update(depense: DepenseErp): Observable<EntityResponseType> {
    return this.http.put<DepenseErp>(this.resourceUrl, depense, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<DepenseErp>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<DepenseErp[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
