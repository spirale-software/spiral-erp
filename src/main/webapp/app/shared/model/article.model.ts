export interface IArticle {
  id?: number;
  nom?: string;
  numero?: string;
  auditId?: number;
  entrepriseId?: number;
}

export class Article implements IArticle {
  constructor(public id?: number, public nom?: string, public numero?: string, public auditId?: number, public entrepriseId?: number) {}
}
