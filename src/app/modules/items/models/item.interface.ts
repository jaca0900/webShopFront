import { IBase } from '../../shared';

export interface IItem extends IBase {
  name: string | null;
  description: string | null;
  quantity: number | null;
  startDate: Date | null;
  endDate: Date | null;
  createDate: Date | null;
  item_price: number | null;
  amount_left: number | null;
  user_id: number | null;
  images: string[];
  user: {
    account: string;
  };
}
