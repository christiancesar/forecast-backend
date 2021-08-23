import ICreateSubItemDTO from '@modules/items/dtos/ICreateSubItemDTO';
import IUpdateSubItemDTO from '@modules/items/dtos/IUpdateSubItemDTO';
import SubItem from '@modules/items/entities/SubItem';

export default interface ISubItemsRepository {
  createSubItem(data: ICreateSubItemDTO): Promise<SubItem>;
  findBySubItemId(subItemId: string): Promise<SubItem | undefined>;
  updateSubItem(data: IUpdateSubItemDTO): Promise<SubItem>;
}
