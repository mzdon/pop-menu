import {MonetaryValue} from 'models/MonetaryValue';

export interface MenuItem {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  price: MonetaryValue;
}
