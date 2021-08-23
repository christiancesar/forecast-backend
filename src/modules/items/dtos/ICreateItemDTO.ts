import SubItem from '../entities/SubItem';

export default interface ICreateItemDTO {
  item: {
    name: string;
    quantity: number;
    price: number;
    discontPercent: number;
    discontValue: number;
    totalPrice: number;
    comments: string;
    subItems: [
      {
        name: string;
        quantity: number;
        price: number;
        discontPercent: number;
        discontValue: number;
        totalPrice: number;
        comments: string;
      },
    ];
  };
}
