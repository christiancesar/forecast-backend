import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Item from '../../entities/Item';
import IItemsRepository from '../../repositories/interfaces/IItemsRepository';

interface IRequest {
  itemId: string;
}

@injectable()
export default class ShowItemService {
  constructor(
    @inject('ItemsRepository')
    private itemsRepository: IItemsRepository,
  ) {}

  async execute({ itemId }: IRequest): Promise<Item> {
    const item = await this.itemsRepository.findByItemId(itemId);

    if (!item) {
      throw new AppError('Item not exists!');
    }
    return item;
  }
}
