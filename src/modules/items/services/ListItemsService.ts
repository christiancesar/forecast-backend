import { inject, injectable } from 'tsyringe';
import Item from '../entities/Item';
import IItemsRepository from '../repositories/interfaces/IItemsRepository';

@injectable()
export default class ListItemsService {
  constructor(
    @inject('ItemsRepository')
    private itemsRepository: IItemsRepository,
  ) {}

  async execute(): Promise<Item[]> {
    const items = await this.itemsRepository.findAllItems();

    return items;
  }
}
