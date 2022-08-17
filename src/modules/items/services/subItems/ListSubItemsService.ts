import { inject, injectable } from 'tsyringe';
import Item from '../../entities/SubItem';
import ISubItemsRepository from '../../repositories/interfaces/ISubItemsRepository';

@injectable()
export default class ListItemsService {
  constructor(
    @inject('SubItemsRepository')
    private subItemsRepository: ISubItemsRepository,
  ) {}

  async execute(): Promise<Item[]> {
    const subItems = await this.subItemsRepository.findAllSubItems();

    return subItems;
  }
}
