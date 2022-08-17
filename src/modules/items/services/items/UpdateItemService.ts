import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Item from '../../entities/Item';
import SubItem from '../../entities/SubItem';
import IItemsRepository from '../../repositories/interfaces/IItemsRepository';
import ISubItemsRepository from '../../repositories/interfaces/ISubItemsRepository';

interface IRequest {
  itemId: string;
  name: string;
  model: string;
  brand: string;
  quantity: number;
  price: number;
  discontPercent: number;
  discontValue: number;
  totalPrice: number;
  comments: string;
  subItems: string[];
}

@injectable()
export default class UpdateItemService {
  constructor(
    @inject('ItemsRepository')
    private itemsRepository: IItemsRepository,

    @inject('SubItemsRepository')
    private subItemsRepository: ISubItemsRepository,
  ) {}

  async execute({
    itemId,
    name,
    model,
    brand,
    quantity,
    price,
    discontPercent,
    discontValue,
    totalPrice,
    comments,
    subItems,
  }: IRequest): Promise<Item> {
    const itemExists = await this.itemsRepository.findByItemId(itemId);

    if (!itemExists) {
      throw new AppError('Item not exists!');
    }

    // verificar os subitems se existem, caso nao existir retornar erro

    const subItemsExists = await this.subItemsRepository.findSubItemsIds(
      subItems,
    );

    if (subItemsExists) {
      if (subItemsExists.length !== subItems.length) {
        throw new AppError('One or more subitems not exists!');
      }
    }

    const updatedItem = await this.itemsRepository.updateItem({
      id: itemId,
      name,
      model,
      brand,
      quantity,
      price,
      discontPercent,
      discontValue,
      totalPrice,
      comments,
      subItems: subItemsExists!,
    });
    return updatedItem;
  }
}
