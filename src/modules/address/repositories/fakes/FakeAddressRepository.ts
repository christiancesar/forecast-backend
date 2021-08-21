import ICreateAddressDTO from '@modules/address/dtos/ICreateAddressDTO';
import Address from '@modules/address/entities/Address';
import { v4 as uuid } from 'uuid';
import IAddressRepository from '../interfaces/IAddressRepository';

export default class AddressRepository implements IAddressRepository {
  private address: Address[] = [];

  async findByAddressId(addressId: string): Promise<Address | undefined> {
    const address = this.address.find(element => element.id === addressId);

    return address;
  }

  async createAddress(address: ICreateAddressDTO): Promise<Address> {
    const newAddress = new Address();

    Object.assign(newAddress, { id: uuid(), ...address });

    this.address.push(newAddress);

    return newAddress;
  }

  async updateAddress(address: Address): Promise<Address> {
    const addressIndex = this.address.findIndex(alement => alement === address);

    this.address[addressIndex] = address;

    return this.address[addressIndex];
  }
}
