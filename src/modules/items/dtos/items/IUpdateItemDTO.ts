import SubItem from '../../entities/SubItem';

export default interface IUpdateItemDTO {
  id: string;
  name: string;
  model: string;
  brand: string;
  quantity: number;
  price: number;
  discontPercent: number;
  discontValue: number;
  totalPrice: number;
  comments: string;
  subItems: SubItem[];
}
