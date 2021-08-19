import ICreateAddressDTO from '@modules/dto/ICreateAddressDTO';

export interface ICreateUserDTO {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  addressId: string;
}
