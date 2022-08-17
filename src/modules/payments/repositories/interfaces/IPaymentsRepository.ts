import ICreatePaymentDTO from '@modules/payments/dtos/ICreatePaymentDTO';
import Payment from '@modules/payments/entities/Payment';

export default interface IPaymentsRepository {
  createPayment(data: ICreatePaymentDTO): Promise<Payment>;
}
