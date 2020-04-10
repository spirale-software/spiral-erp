import { IAudit } from 'app/shared/model/audit.model';
import { IFournisseur } from 'app/shared/model/fournisseur.model';
import { IEntreprise } from 'app/shared/model/entreprise.model';

export interface IArticle {
  id?: number;
  nom?: string;
  code?: string;
  numero?: string;
  audit?: IAudit;
  fournisseur?: IFournisseur;
  entreprise?: IEntreprise;
}

export class Article implements IArticle {
  constructor(
    public id?: number,
    public nom?: string,
    public code?: string,
    public numero?: string,
    public audit?: IAudit,
    public fournisseur?: IFournisseur,
    public entreprise?: IEntreprise
  ) {}
}
