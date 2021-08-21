import ICreateContactDTO from '@modules/contacts/dtos/ICreateContactDTO';
import IUpdateContactDTO from '@modules/contacts/dtos/IUpdateContactDTO';
import Contact from '@modules/contacts/entities/Contact';

export default interface IContactsRepository {
  createContact(data: ICreateContactDTO): Promise<Contact>;
  findAllContacts(): Promise<Contact[]>;
  findByContactId(contactId: string): Promise<Contact | undefined>;
  updateContact(data: IUpdateContactDTO): Promise<Contact>;
}
