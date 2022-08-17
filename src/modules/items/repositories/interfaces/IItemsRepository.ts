import ICreateItemDTO from '@modules/items/dtos/items/ICreateItemDTO';
import IUpdateItemDTO from '@modules/items/dtos/items/IUpdateItemDTO';
import Item from '@modules/items/entities/Item';

export default interface IItemsRepository {
  createItem(data: ICreateItemDTO): Promise<Item>;
  findByItemId(itemId: string): Promise<Item | undefined>;
  findAllItems(): Promise<Item[]>;
  updateItem(data: IUpdateItemDTO): Promise<Item>;
}
