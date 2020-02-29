import { Moment } from 'moment';

export interface Produit {
  id: number;
  numero: number;
  typeDeProduit: string;
  libelle: string;
  quantite: number;
  prixAchatHTVA: number;
  tva: number;
  dateAchat: Moment;
}
