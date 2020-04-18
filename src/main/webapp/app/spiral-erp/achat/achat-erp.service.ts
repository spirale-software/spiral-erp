import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { IAchat } from 'app/shared/model/achat.model';
import { AchatErp } from 'app/spiral-erp/shared/domain/achat-erp';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { createRequestOption } from 'app/shared/util/request-util';

type EntityResponseType = HttpResponse<AchatErp>;
type EntityArrayResponseType = HttpResponse<AchatErp[]>;

@Injectable({ providedIn: 'root' })
export class AchatErpService {
  public resourceUrl = SERVER_API_URL + 'api/erp/achats';

  constructor(protected http: HttpClient) {}

  create(achat: AchatErp): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(achat);
    return this.http
      .post<AchatErp>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(achat: AchatErp): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(achat);
    return this.http
      .put<AchatErp>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<AchatErp>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<AchatErp[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(achat: AchatErp): IAchat {
    const copy: IAchat = Object.assign({}, achat, {
      dateAchat: achat.dateAchat && achat.dateAchat.isValid() ? achat.dateAchat.toJSON() : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateAchat = res.body.dateAchat ? moment(res.body.dateAchat) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((achat: IAchat) => {
        achat.dateAchat = achat.dateAchat ? moment(achat.dateAchat) : undefined;
      });
    }
    return res;
  }
}
