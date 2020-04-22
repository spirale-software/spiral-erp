import { SERVER_API_URL } from 'app/app.constants';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { DepenseErp } from 'app/spiral-erp/shared/domain/depense-erp';
import { createRequestOption } from 'app/shared/util/request-util';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

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
    return this.http
      .get<DepenseErp>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<DepenseErp[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateDepense = res.body.dateDepense ? moment(res.body.dateDepense) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((depense: DepenseErp) => {
        depense.dateDepense = depense.dateDepense ? moment(depense.dateDepense) : undefined;
      });
    }
    return res;
  }
}
