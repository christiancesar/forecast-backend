import ICreateBudfgetDTO from '@modules/budgets/dtos/ICreateBudgetDTO';
import Budget from '@modules/budgets/entities/Budget';
import { getRepository, Repository } from 'typeorm';

export default class BudgetsRepository {
  private ormRepository: Repository<Budget>;

  constructor() {
    this.ormRepository = getRepository(Budget);
  }

  async createBudget(data: ICreateBudfgetDTO): Promise<Budget> {
    const budget = this.ormRepository.create(data);
    await this.ormRepository.save(budget);
    return budget;
  }
}
