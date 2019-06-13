import { IBase } from '../../../../shared';

export interface IUser extends IBase {
  first_name: string | null;
  last_name: string | null;
  addres: string | null;
  email: string | null;
  login: string | null;
  pass: string | null;
  bank: string | null;
  payment_methods: string | null;
}