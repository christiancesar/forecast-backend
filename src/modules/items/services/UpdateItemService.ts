import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Item from '../entities/Item';
import SubItem from '../entities/SubItem';
import IItemsRepository from '../repositories/interfaces/IItemsRepository';
import ISubItemsRepository from '../repositories/interfaces/ISubItemsRepository';

interface IRequest {
  item: {
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
    subItems: [
      {
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
      },
    ];
  };
}

@injectable()
export default class UpdateItemService {
  constructor(
    @inject('ItemsRepository')
    private itemsRepository: IItemsRepository,
  ) {}

  async execute({ item }: IRequest): Promise<Item> {
    const itemExists = await this.itemsRepository.findByItemId(item.id);

    if (!itemExists) {
      throw new AppError('Item not exists!');
    }

    Object.assign(itemExists, item);

    const updatedItem = await this.itemsRepository.updateItem(itemExists);
    return updatedItem;
  }
}
