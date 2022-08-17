import { inject, injectable } from 'tsyringe';
import SubItem from '../../entities/SubItem';
import ISubItemsRepository from '../../repositories/interfaces/ISubItemsRepository';

interface IRequest {
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
export default class CreateItemService {
  constructor(
    @inject('SubItemsRepository')
    private subItemsRepository: ISubItemsRepository,
  ) {}

  async execute({
    name,
    brand,
    comments,
    discontPercent,
    discontValue,
    model,
    price,
    quantity,
    totalPrice,
  }: IRequest): Promise<SubItem> {
    const newSubItem = await this.subItemsRepository.createSubItem({
      name,
      brand,
      comments,
      discontPercent,
      discontValue,
      model,
      price,
      quantity,
      totalPrice,
    });

    return newSubItem;
  }
}
