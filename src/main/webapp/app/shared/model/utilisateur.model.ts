import { IUser } from 'app/core/user/user.model';
import { IEntreprise } from 'app/shared/model/entreprise.model';

export interface IUtilisateur {
  id?: number;
  jhiUser?: IUser;
  entreprise?: IEntreprise;
}

export class Utilisateur implements IUtilisateur {
  constructor(public id?: number, public jhiUser?: IUser, public entreprise?: IEntreprise) {}
}
