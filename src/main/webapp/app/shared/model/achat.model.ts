import { Moment } from 'moment';
import { IAudit } from 'app/shared/model/audit.model';
import { IUtilisateur } from 'app/shared/model/utilisateur.model';
import { IArticle } from 'app/shared/model/article.model';
import { IEntreprise } from 'app/shared/model/entreprise.model';

export interface IAchat {
  id?: number;
  dateAchat?: Moment;
  prixUnitaire?: number;
  quantite?: number;
  audit?: IAudit;
  utilisateur?: IUtilisateur;
  article?: IArticle;
  entreprise?: IEntreprise;
}

export class Achat implements IAchat {
  constructor(
    public id?: number,
    public dateAchat?: Moment,
    public prixUnitaire?: number,
    public quantite?: number,
    public audit?: IAudit,
    public utilisateur?: IUtilisateur,
    public article?: IArticle,
    public entreprise?: IEntreprise
  ) {}
}
