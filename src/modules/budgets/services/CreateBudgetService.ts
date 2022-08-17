import Budget from '../entities/Budget';

export default class CreateBudgetService {
  async execute(): Promise<Budget> {
    const budget = new Budget();
    return budget;
  }
}
