import { Moment } from 'moment';
import { Produit } from 'app/spiral-erp/shared/domain/produit';

export interface Vente {
  id: number;
  dateVente: Moment;
  produit: Produit;
  quantiteVendu: number;
}
