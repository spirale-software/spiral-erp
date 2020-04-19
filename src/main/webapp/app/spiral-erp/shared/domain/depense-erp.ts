import { Moment } from 'moment';

export interface DepenseErp {
  id: number;
  description: string;
  typeDepense: string;
  dateDepense: Moment;
  montant: number;
}
