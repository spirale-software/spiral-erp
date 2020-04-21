import { IUser } from 'app/core/user/user.model';
import { IAudit } from 'app/shared/model/audit.model';
import { IAchat } from 'app/shared/model/achat.model';
import { IVente } from 'app/shared/model/vente.model';
import { IEntreprise } from 'app/shared/model/entreprise.model';

export interface IUtilisateur {
  id?: number;
  telephone?: string;
  adresse?: string;
  jhiUser?: IUser;
  audit?: IAudit;
  achats?: IAchat[];
  ventes?: IVente[];
  entreprise?: IEntreprise;
}

export class Utilisateur implements IUtilisateur {
  constructor(
    public id?: number,
    public telephone?: string,
    public adresse?: string,
    public jhiUser?: IUser,
    public audit?: IAudit,
    public achats?: IAchat[],
    public ventes?: IVente[],
    public entreprise?: IEntreprise
  ) {}
}
