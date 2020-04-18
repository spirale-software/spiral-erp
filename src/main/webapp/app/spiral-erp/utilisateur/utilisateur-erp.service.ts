import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { Observable } from 'rxjs';
import { IUtilisateur } from 'app/shared/model/utilisateur.model';
import { UtilisateurService } from 'app/entities/utilisateur/utilisateur.service';

type EntityResponseType = HttpResponse<IUtilisateur>;
type EntityArrayResponseType = HttpResponse<IUtilisateur[]>;

@Injectable({ providedIn: 'root' })
export class UtilisateurErpService {
  constructor(public utilisateurService: UtilisateurService) {
    utilisateurService.resourceUrl = SERVER_API_URL + 'api/erp/utilisateurs';
  }

  create(article: IUtilisateur): Observable<EntityResponseType> {
    return this.utilisateurService.create(article);
  }

  update(article: IUtilisateur): Observable<EntityResponseType> {
    return this.utilisateurService.update(article);
  }

  find(id: number): Observable<EntityResponseType> {
    return this.utilisateurService.find(id);
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    return this.utilisateurService.query(req);
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.utilisateurService.delete(id);
  }
}
