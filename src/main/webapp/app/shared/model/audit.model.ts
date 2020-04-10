import { Moment } from 'moment';

export interface IAudit {
  id?: number;
  createdAt?: Moment;
  modifiedAt?: Moment;
}

export class Audit implements IAudit {
  constructor(public id?: number, public createdAt?: Moment, public modifiedAt?: Moment) {}
}
