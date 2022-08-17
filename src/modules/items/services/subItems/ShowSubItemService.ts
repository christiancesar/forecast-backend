import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import SubItem from '../../entities/SubItem';
import ISubItemsRepository from '../../repositories/interfaces/ISubItemsRepository';

interface IRequest {
  subItemId: string;
}

@injectable()
export default class ShowItemService {
  constructor(
    @inject('SubItemsRepository')
    private subItemsRepository: ISubItemsRepository,
  ) {}

  async execute({ subItemId }: IRequest): Promise<SubItem> {
    const subItem = await this.subItemsRepository.findBySubItemId(subItemId);

    if (!subItem) {
      throw new AppError('Item not exists!');
    }
    return subItem;
  }
}
