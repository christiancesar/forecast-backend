export default interface ICreateSubItemDTO {
  name: string;
  model: string;
  brand: string;
  quantity: number;
  price: number;
  discontPercent: number;
  discontValue: number;
  totalPrice: number;
  comments: string;
}
