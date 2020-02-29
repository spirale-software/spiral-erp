import { Fonction } from 'app/spiral-erp/shared/domain/fonction';

export interface Employe {
  id: number;
  matricule: number;
  nom: string;
  prenom: string;
  telephone: number;
  email: string;
  fonction: Fonction;
}
