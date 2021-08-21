import { inject, injectable } from 'tsyringe';
import Address from '../entities/Address';
import IAddressRepository from '../repositories/interfaces/IAddressRepository';

interface IRequest {
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
export default class CreateAddressService {
  constructor(
    @inject('AddressRepository')
    private addressRepository: IAddressRepository,
  ) {}

  public async execute({
    street,
    number,
    complement,
    reference,
    district,
    city,
    state,
    stateAcronym,
    postalCode,
    latitude,
    longitude,
  }: IRequest): Promise<Address> {
    const address = await this.addressRepository.createAddress({
      street,
      number,
      complement,
      reference,
      district,
      city,
      state,
      stateAcronym,
      postalCode,
      latitude,
      longitude,
    });

    return address;
  }
}
