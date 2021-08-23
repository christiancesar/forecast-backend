export default interface IUpdateSubItemDTO {
  subItemId: string;
  name: string;
  quantity: number;
  price: number;
  discontPercent: number;
  discontValue: number;
  totalPrice: number;
  comments: string;
}
