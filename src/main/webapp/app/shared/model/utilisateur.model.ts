import { IUser } from 'app/core/user/user.model';
import { IAchat } from 'app/shared/model/achat.model';
import { IEntreprise } from 'app/shared/model/entreprise.model';

export interface IUtilisateur {
  id?: number;
  jhiUser?: IUser;
  achats?: IAchat[];
  entreprise?: IEntreprise;
}

export class Utilisateur implements IUtilisateur {
  constructor(public id?: number, public jhiUser?: IUser, public achats?: IAchat[], public entreprise?: IEntreprise) {}
}
