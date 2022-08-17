import Payment from '@modules/payments/entities/Payment';

export default interface ICreateBudfgetDTO {
  uuid: string;
  shortId: string;
  accepted: boolean;
  provider: {
    name: string;
    description: string;
    isHeadquarters: boolean;
    email: string;
    phones: string[];
    stateRegistration: string;
    employerIdentificationNumber: string;
    address: {
      street: string;
      number: string;
      complement: string;
      reference: string;
      district: string;
      city: string;
      state: string;
      stateAcronym: string;
      postalCode: string;
      latitude: string;
      longitude: string;
    };
  };
  responsibleSeller: string;
  items: {
    name: string;
    quantity: number;
    price: number;
    discontPercent: number;
    discontValue: number;
    totalPrice: number;
    comments: string;
    subItems: {
      name: string;
      quantity: number;
      price: number;
      discontPercent: number;
      discontValue: number;
      totalPrice: number;
      comments: string;
    }[];
  }[];
  payments: Payment[];
  transporter: {
    name: string;
    price: number;
    predictionDate: Date;
  };
  discontPercent: number;
  discontValue: number;
  price: number;
  totalPrice: number;
  comments: string;
}
