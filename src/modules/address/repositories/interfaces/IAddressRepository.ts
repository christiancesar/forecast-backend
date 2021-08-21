import ICreateAddressDTO from '@modules/address/dtos/ICreateAddressDTO';
import { IUpdateAddressDTO } from '@modules/address/dtos/IUpdateAddressDTO';
import Address from '@modules/address/entities/Address';

export default interface IAddressRepository {
  findByAddressId(addressId: string): Promise<Address | undefined>;
  findAll(): Promise<Address[]>;
  createAddress(addres: ICreateAddressDTO): Promise<Address>;
  updateAddress(data: IUpdateAddressDTO): Promise<Address>;
}
