import { IAudit } from 'app/shared/model/audit.model';
import { IEntreprise } from 'app/shared/model/entreprise.model';

export interface IFournisseur {
  id?: number;
  nom?: string;
  adresse?: string;
  telephone?: string;
  audit?: IAudit;
  entreprise?: IEntreprise;
}

export class Fournisseur implements IFournisseur {
  constructor(
    public id?: number,
    public nom?: string,
    public adresse?: string,
    public telephone?: string,
    public audit?: IAudit,
    public entreprise?: IEntreprise
  ) {}
}
