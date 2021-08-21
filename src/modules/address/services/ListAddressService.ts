import { inject, injectable } from 'tsyringe';
import Address from '../entities/Address';
import IAddressRepository from '../repositories/interfaces/IAddressRepository';

@injectable()
export default class ListAddressService {
  constructor(
    @inject('AddressRepository')
    private addressRepository: IAddressRepository,
  ) {}

  public async execute(): Promise<Address[]> {
    const address = await this.addressRepository.findAll();

    return address;
  }
}
