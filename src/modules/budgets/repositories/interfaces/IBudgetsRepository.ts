import ICreateBudfgetDTO from '@modules/budgets/dtos/ICreateBudgetDTO';
import Budget from '@modules/budgets/entities/Budget';

export default interface IBudgetsRepository {
  createBudget(data: ICreateBudfgetDTO): Promise<Budget>;
}
