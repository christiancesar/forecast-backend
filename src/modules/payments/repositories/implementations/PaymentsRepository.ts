import ICreatePaymentDTO from '@modules/payments/dtos/ICreatePaymentDTO';
import Payment from '@modules/payments/entities/Payment';
import { getRepository, Repository } from 'typeorm';

export default class PaymentsRepository {
  private ormRepository: Repository<Payment>;

  constructor() {
    this.ormRepository = getRepository(Payment);
  }

  async createPayment(data: ICreatePaymentDTO): Promise<Payment> {
    const payment = this.ormRepository.create(data);

    await this.ormRepository.save(payment);

    return payment;
  }
}
