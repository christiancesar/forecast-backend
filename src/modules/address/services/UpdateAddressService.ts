import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Address from '../entities/Address';
import IAddressRepository from '../repositories/interfaces/IAddressRepository';

interface IRequest {
  addressId: string;
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
}

@injectable()
export default class UpdateAddressService {
  constructor(
    @inject('AddressRepository')
    private addressRepository: IAddressRepository,
  ) {}

  async execute({
    addressId,
    street,
    city,
    complement,
    district,
    number,
    postalCode,
    reference,
    state,
    stateAcronym,
    latitude,
    longitude,
  }: IRequest): Promise<Address> {
    const addressExist = await this.addressRepository.findByAddressId(
      addressId,
    );

    if (!addressExist) {
      throw new AppError('Address not exists!');
    }

    const address = await this.addressRepository.updateAddress({
      addressId,
      street,
      city,
      complement,
      district,
      number,
      postalCode,
      reference,
      state,
      stateAcronym,
      latitude,
      longitude,
    });

    return address;
  }
}
