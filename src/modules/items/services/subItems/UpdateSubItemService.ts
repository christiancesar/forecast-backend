import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import SubItem from '../../entities/SubItem';
import ISubItemsRepository from '../../repositories/interfaces/ISubItemsRepository';

interface IRequest {
  subItemId: string;
  name: string;
  model: string;
  brand: string;
  quantity: number;
  price: number;
  discontPercent: number;
  discontValue: number;
  totalPrice: number;
  comments: string;
}

@injectable()
export default class UpdateItemService {
  constructor(
    @inject('SubItemsRepository')
    private subItemsRepository: ISubItemsRepository,
  ) {}

  async execute({
    subItemId,
    name,
    model,
    brand,
    quantity,
    price,
    discontPercent,
    discontValue,
    totalPrice,
    comments,
  }: IRequest): Promise<SubItem> {
    const subItemExists = await this.subItemsRepository.findBySubItemId(
      subItemId,
    );

    if (!subItemExists) {
      throw new AppError('Item not exists!');
    }

    const updatedSubItem = await this.subItemsRepository.updateSubItem({
      id: subItemId,
      name,
      model,
      brand,
      quantity,
      price,
      discontPercent,
      discontValue,
      totalPrice,
      comments,
    });

    return updatedSubItem;
  }
}
