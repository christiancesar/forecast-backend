import { inject, injectable } from 'tsyringe';
import Item from '../../entities/Item';
import IItemsRepository from '../../repositories/interfaces/IItemsRepository';

interface IRequest {
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

@injectable()
export default class CreateItemService {
  constructor(
    @inject('ItemsRepository')
    private itemsRepository: IItemsRepository,
  ) {}

  async execute({
    name,
    model,
    brand,
    quantity,
    price,
    discontPercent,
    discontValue,
    totalPrice,
    comments,
  }: IRequest): Promise<Item> {
    const item = await this.itemsRepository.createItem({
      name,
      model,
      brand,
      quantity,
      price,
      discontPercent,
      discontValue,
      totalPrice,
      comments,
    });

    return item;
  }
}
