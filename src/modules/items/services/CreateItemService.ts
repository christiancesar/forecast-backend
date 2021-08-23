import { inject, injectable } from 'tsyringe';
import Item from '../entities/Item';
import IItemsRepository from '../repositories/interfaces/IItemsRepository';

interface IRequest {
  item: {
    name: string;
    model: string;
    brand: string;
    quantity: number;
    price: number;
    discontPercent: number;
    discontValue: number;
    totalPrice: number;
    comments: string;
    subItems: [
      {
        name: string;
        model: string;
        brand: string;
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

@injectable()
export default class CreateItemService {
  constructor(
    @inject('ItemsRepository')
    private itemsRepository: IItemsRepository,
  ) {}

  async execute({ item }: IRequest): Promise<Item> {
    const newItem = await this.itemsRepository.createItem({ item });

    return newItem;
  }
}
