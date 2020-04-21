import { IAudit } from 'app/shared/model/audit.model';
import { IUtilisateur } from 'app/shared/model/utilisateur.model';
import { IArticle } from 'app/shared/model/article.model';
import { IEntreprise } from 'app/shared/model/entreprise.model';

export interface IVente {
  id?: number;
  tauxTVA?: number;
  quantiteVendu?: number;
  prixUnitaireVente?: number;
  audit?: IAudit;
  vendeur?: IUtilisateur;
  article?: IArticle;
  entreprise?: IEntreprise;
}

export class Vente implements IVente {
  constructor(
    public id?: number,
    public tauxTVA?: number,
    public quantiteVendu?: number,
    public prixUnitaireVente?: number,
    public audit?: IAudit,
    public vendeur?: IUtilisateur,
    public article?: IArticle,
    public entreprise?: IEntreprise
  ) {}
}
