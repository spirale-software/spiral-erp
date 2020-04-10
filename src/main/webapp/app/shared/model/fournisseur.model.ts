import { IEntreprise } from 'app/shared/model/entreprise.model';

export interface IFournisseur {
  id?: number;
  nom?: string;
  adresse?: string;
  telephone?: string;
  entreprise?: IEntreprise;
}

export class Fournisseur implements IFournisseur {
  constructor(
    public id?: number,
    public nom?: string,
    public adresse?: string,
    public telephone?: string,
    public entreprise?: IEntreprise
  ) {}
}
