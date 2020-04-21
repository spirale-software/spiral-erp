import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDepense } from 'app/shared/model/depense.model';

type EntityResponseType = HttpResponse<IDepense>;
type EntityArrayResponseType = HttpResponse<IDepense[]>;

@Injectable({ providedIn: 'root' })
export class DepenseService {
  public resourceUrl = SERVER_API_URL + 'api/depenses';

  constructor(protected http: HttpClient) {}

  create(depense: IDepense): Observable<EntityResponseType> {
    return this.http.post<IDepense>(this.resourceUrl, depense, { observe: 'response' });
  }

  update(depense: IDepense): Observable<EntityResponseType> {
    return this.http.put<IDepense>(this.resourceUrl, depense, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDepense>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDepense[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
