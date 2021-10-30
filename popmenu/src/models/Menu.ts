import {MenuItem} from 'models/MenuItem';

export interface Menu {
  id: string;
  title: string;
  items: MenuItem[];
}
