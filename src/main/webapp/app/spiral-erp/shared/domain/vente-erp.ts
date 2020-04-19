import { Moment } from 'moment';

export interface VenteErp {
  id: number;
  idVendeur: number;
  nomVendeur: string;
  dateVente: Moment;
  nomProduit: string;
  idProduit: number;
  prixUnitaireVente: number;
  quantiteVendu: number;
  tauxTVA: number;
}
