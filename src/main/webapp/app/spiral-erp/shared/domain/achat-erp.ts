import { Moment } from 'moment';

export interface AchatErp {
  id: number;
  idAcheteur: number;
  nomAcheteur: string;
  loginAcheteur: string;
  dateAchat?: Moment;
  idArticle: number;
  nomArticle: string;
  prixUnitaire: number;
  quantite: number;
}
