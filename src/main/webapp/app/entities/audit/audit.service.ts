import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAudit } from 'app/shared/model/audit.model';

type EntityResponseType = HttpResponse<IAudit>;
type EntityArrayResponseType = HttpResponse<IAudit[]>;

@Injectable({ providedIn: 'root' })
export class AuditService {
  public resourceUrl = SERVER_API_URL + 'api/audits';

  constructor(protected http: HttpClient) {}

  create(audit: IAudit): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(audit);
    return this.http
      .post<IAudit>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(audit: IAudit): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(audit);
    return this.http
      .put<IAudit>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAudit>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAudit[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(audit: IAudit): IAudit {
    const copy: IAudit = Object.assign({}, audit, {
      createdAt: audit.createdAt && audit.createdAt.isValid() ? audit.createdAt.toJSON() : undefined,
      modifiedAt: audit.modifiedAt && audit.modifiedAt.isValid() ? audit.modifiedAt.toJSON() : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createdAt = res.body.createdAt ? moment(res.body.createdAt) : undefined;
      res.body.modifiedAt = res.body.modifiedAt ? moment(res.body.modifiedAt) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((audit: IAudit) => {
        audit.createdAt = audit.createdAt ? moment(audit.createdAt) : undefined;
        audit.modifiedAt = audit.modifiedAt ? moment(audit.modifiedAt) : undefined;
      });
    }
    return res;
  }
}
