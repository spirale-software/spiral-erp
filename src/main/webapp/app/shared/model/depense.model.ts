import { IAudit } from 'app/shared/model/audit.model';
import { IEntreprise } from 'app/shared/model/entreprise.model';

export interface IDepense {
  id?: number;
  description?: string;
  typeDepense?: string;
  montant?: number;
  audit?: IAudit;
  entreprise?: IEntreprise;
}

export class Depense implements IDepense {
  constructor(
    public id?: number,
    public description?: string,
    public typeDepense?: string,
    public montant?: number,
    public audit?: IAudit,
    public entreprise?: IEntreprise
  ) {}
}
