import { IArticle } from 'app/shared/model/article.model';
import { IFournisseur } from 'app/shared/model/fournisseur.model';
import { IAchat } from 'app/shared/model/achat.model';
import { IUtilisateur } from 'app/shared/model/utilisateur.model';

export interface IEntreprise {
  id?: number;
  nom?: string;
  articles?: IArticle[];
  fournisseurs?: IFournisseur[];
  achats?: IAchat[];
  utilisateurs?: IUtilisateur[];
}

export class Entreprise implements IEntreprise {
  constructor(
    public id?: number,
    public nom?: string,
    public articles?: IArticle[],
    public fournisseurs?: IFournisseur[],
    public achats?: IAchat[],
    public utilisateurs?: IUtilisateur[]
  ) {}
}
