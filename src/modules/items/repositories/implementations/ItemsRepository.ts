import ICreateItemDTO from '@modules/items/dtos/items/ICreateItemDTO';
import IUpdateItemDTO from '@modules/items/dtos/items/IUpdateItemDTO';
import Item from '@modules/items/entities/Item';
import { getRepository, Repository } from 'typeorm';
import IItemsRepository from '../interfaces/IItemsRepository';

export default class ItemsRepository implements IItemsRepository {
  private ormRepository: Repository<Item>;

  constructor() {
    this.ormRepository = getRepository(Item);
  }

  async createItem(data: ICreateItemDTO): Promise<Item> {
    const item = this.ormRepository.create(data);
    await this.ormRepository.save(item);
    return item;
  }

  async findByItemId(itemId: string): Promise<Item | undefined> {
    const item = await this.ormRepository.findOne({ where: { id: itemId } });
    return item;
  }

  async findAllItems(): Promise<Item[]> {
    const items = await this.ormRepository.find();
    return items;
  }

  async updateItem(data: IUpdateItemDTO): Promise<Item> {
    const item = await this.ormRepository.save(data);
    return item;
  }
}
