import { Methods } from '../types/MethodsEnum';

export default interface ICreatePaymentDTO {
  totalAmount: number;
  method: Methods;
  installments: number; // parcelas
  interestFreeAt: number; // Sem juros até x parcela
  interestRates: number; // Taxa acima do valor interestFreeAt
}
