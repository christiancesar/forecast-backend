import Address from '@modules/address/models/Address';
import ICreateAddressDTO from '@modules/dto/ICreateAddressDTO';

export default interface IAddressRepository {
  findByAddressId(addressId: string): Promise<Address | undefined>;
  createAddress(addres: ICreateAddressDTO): Promise<Address>;
  updateAddress(address: Address): Promise<Address>;
}
