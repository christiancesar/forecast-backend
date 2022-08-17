import Address from '@modules/address/entities/Address';

export interface ICreateUserDTO {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  address?: Address;
}
