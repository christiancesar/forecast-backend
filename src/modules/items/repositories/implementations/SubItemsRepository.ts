import ICreateSubItemDTO from '@modules/items/dtos/subItems/ICreateSubItemDTO';
import IUpdateSubItemDTO from '@modules/items/dtos/subItems/IUpdateSubItemDTO';
import SubItem from '@modules/items/entities/SubItem';
import { getRepository, Repository } from 'typeorm';
import ISubItemsRepository from '../interfaces/ISubItemsRepository';

export default class SubItemsRepository implements ISubItemsRepository {
  private ormRepository: Repository<SubItem>;

  constructor() {
    this.ormRepository = getRepository(SubItem);
  }

  async createSubItem(data: ICreateSubItemDTO): Promise<SubItem> {
    const subItem = this.ormRepository.create(data);
    await this.ormRepository.save(subItem);
    return subItem;
  }

  async findAllSubItems(): Promise<SubItem[]> {
    const subItems = await this.ormRepository.find();
    return subItems;
  }

  async findBySubItemId(subItemId: string): Promise<SubItem | undefined> {
    const subItem = await this.ormRepository.findOne({
      where: { id: subItemId },
    });
    return subItem;
  }

  async findSubItemsIds(subItemsIds: string[]): Promise<SubItem[] | undefined> {
    const subItems = await this.ormRepository.findByIds(subItemsIds);
    return subItems;
  }

  async updateSubItem(data: IUpdateSubItemDTO): Promise<SubItem> {
    const subItem = await this.ormRepository.save(data);
    return subItem;
  }
}
