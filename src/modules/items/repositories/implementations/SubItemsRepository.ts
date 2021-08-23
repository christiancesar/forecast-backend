import ICreateSubItemDTO from '@modules/items/dtos/ICreateSubItemDTO';
import IUpdateSubItemDTO from '@modules/items/dtos/IUpdateSubItemDTO';
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

  async findBySubItemId(subItemId: string): Promise<SubItem | undefined> {
    const subItem = await this.ormRepository.findOne({
      where: { id: subItemId },
    });
    return subItem;
  }

  async updateSubItem(data: IUpdateSubItemDTO): Promise<SubItem> {
    const subItem = await this.ormRepository.save(data);
    return subItem;
  }
}
