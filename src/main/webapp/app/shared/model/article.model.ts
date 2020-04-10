import { IAudit } from 'app/shared/model/audit.model';
import { IEntreprise } from 'app/shared/model/entreprise.model';

export interface IArticle {
  id?: number;
  nom?: string;
  code?: string;
  numero?: string;
  audit?: IAudit;
  entreprise?: IEntreprise;
}

export class Article implements IArticle {
  constructor(
    public id?: number,
    public nom?: string,
    public code?: string,
    public numero?: string,
    public audit?: IAudit,
    public entreprise?: IEntreprise
  ) {}
}
