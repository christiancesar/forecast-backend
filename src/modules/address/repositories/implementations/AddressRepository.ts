import ICreateAddressDTO from '@modules/address/dtos/ICreateAddressDTO';
import { IUpdateAddressDTO } from '@modules/address/dtos/IUpdateAddressDTO';
import Address from '@modules/address/entities/Address';
import { getRepository, Repository } from 'typeorm';
import IAddressRepository from '../interfaces/IAddressRepository';

export default class AddressRepository implements IAddressRepository {
  private ormRepository: Repository<Address>;

  constructor() {
    this.ormRepository = getRepository(Address);
  }

  async findByAddressId(addressId: string): Promise<Address | undefined> {
    const address = await this.ormRepository.findOne({
      where: { id: addressId },
    });

    return address;
  }

  async createAddress(address: ICreateAddressDTO): Promise<Address> {
    const createdAddress = this.ormRepository.create(address);

    return this.ormRepository.save(createdAddress);
  }

  async updateAddress(data: IUpdateAddressDTO): Promise<Address> {
    return this.ormRepository.save(data);
  }

  async findAll(): Promise<Address[]> {
    return this.ormRepository.find();
  }
}
