import ICreateItemDTO from '@modules/items/dtos/ICreateItemDTO';
import IUpdateItemDTO from '@modules/items/dtos/IUpdateItemDTO';
import Item from '@modules/items/entities/Item';

export default interface IItemsRepository {
  createItem(data: ICreateItemDTO): Promise<Item>;
  findByItemId(itemId: string): Promise<Item | undefined>;
  findAllItems(): Promise<Item[]>;
  updateItem(data: Item): Promise<Item>;
}
