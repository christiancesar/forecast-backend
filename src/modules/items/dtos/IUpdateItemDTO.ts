import SubItem from '../entities/SubItem';

export default interface IUpdateItemDTO {
  itemId: string;
  name: string;
  quantity: number;
  price: number;
  discontPercent: number;
  discontValue: number;
  totalPrice: number;
  comments: string;
  subItems: SubItem[];
}
