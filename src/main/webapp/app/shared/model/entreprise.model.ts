import { IAudit } from 'app/shared/model/audit.model';
import { IArticle } from 'app/shared/model/article.model';
import { IFournisseur } from 'app/shared/model/fournisseur.model';
import { IAchat } from 'app/shared/model/achat.model';
import { IUtilisateur } from 'app/shared/model/utilisateur.model';
import { IDepense } from 'app/shared/model/depense.model';
import { IVente } from 'app/shared/model/vente.model';

export interface IEntreprise {
  id?: number;
  nom?: string;
  actif?: boolean;
  audit?: IAudit;
  articles?: IArticle[];
  fournisseurs?: IFournisseur[];
  achats?: IAchat[];
  utilisateurs?: IUtilisateur[];
  depenses?: IDepense[];
  ventes?: IVente[];
}

export class Entreprise implements IEntreprise {
  constructor(
    public id?: number,
    public nom?: string,
    public actif?: boolean,
    public audit?: IAudit,
    public articles?: IArticle[],
    public fournisseurs?: IFournisseur[],
    public achats?: IAchat[],
    public utilisateurs?: IUtilisateur[],
    public depenses?: IDepense[],
    public ventes?: IVente[]
  ) {
    this.actif = this.actif || false;
  }
}
