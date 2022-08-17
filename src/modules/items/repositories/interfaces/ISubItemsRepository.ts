import ICreateSubItemDTO from '@modules/items/dtos/subItems/ICreateSubItemDTO';
import IUpdateSubItemDTO from '@modules/items/dtos/subItems/IUpdateSubItemDTO';
import SubItem from '@modules/items/entities/SubItem';

export default interface ISubItemsRepository {
  createSubItem(data: ICreateSubItemDTO): Promise<SubItem>;
  findBySubItemId(subItemId: string): Promise<SubItem | undefined>;
  findAllSubItems(): Promise<SubItem[]>;
  findSubItemsIds(subItemsIds: string[]): Promise<SubItem[] | undefined>;
  updateSubItem(data: IUpdateSubItemDTO): Promise<SubItem>;
}
