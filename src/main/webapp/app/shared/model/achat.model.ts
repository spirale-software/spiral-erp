import { Moment } from 'moment';
import { IEntreprise } from 'app/shared/model/entreprise.model';

export interface IAchat {
  id?: number;
  dateAchat?: Moment;
  prixUnitaire?: number;
  quantite?: number;
  entreprise?: IEntreprise;
}

export class Achat implements IAchat {
  constructor(
    public id?: number,
    public dateAchat?: Moment,
    public prixUnitaire?: number,
    public quantite?: number,
    public entreprise?: IEntreprise
  ) {}
}
