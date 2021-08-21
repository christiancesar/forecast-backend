import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Address from '../entities/Address';
import IAddressRepository from '../repositories/interfaces/IAddressRepository';

interface IRequest {
  addressId: string;
}

@injectable()
export default class ShowAddressService {
  constructor(
    @inject('AddressRepository')
    private addressRepository: IAddressRepository,
  ) {}

  async execute({ addressId }: IRequest): Promise<Address> {
    const address = await this.addressRepository.findByAddressId(addressId);

    if (!address) {
      throw new AppError('Address not exists!');
    }

    return address;
  }
}
