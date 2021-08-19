import ICreateAddressDTO from '@modules/address/dto/ICreateAddressDTO';
import Address from '@modules/address/models/Address';

export default interface IAddressRepository {
  findByAddressId(addressId: string): Promise<Address | undefined>;
  createAddress(addres: ICreateAddressDTO): Promise<Address>;
  updateAddress(address: Address): Promise<Address>;
}
