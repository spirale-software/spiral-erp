import { IAudit } from 'app/shared/model/audit.model';
import { IAchat } from 'app/shared/model/achat.model';
import { IVente } from 'app/shared/model/vente.model';
import { IFournisseur } from 'app/shared/model/fournisseur.model';
import { IEntreprise } from 'app/shared/model/entreprise.model';

export interface IArticle {
  id?: number;
  nom?: string;
  code?: string;
  numero?: string;
  audit?: IAudit;
  achats?: IAchat[];
  ventes?: IVente[];
  fournisseur?: IFournisseur;
  entreprise?: IEntreprise;
}

export class Article implements IArticle {
  constructor(
    public id?: number,
    public nom?: string,
    public code?: string,
    public numero?: string,
    public audit?: IAudit,
    public achats?: IAchat[],
    public ventes?: IVente[],
    public fournisseur?: IFournisseur,
    public entreprise?: IEntreprise
  ) {}
}
