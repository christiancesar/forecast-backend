import ICreateContactDTO from '@modules/contacts/dtos/ICreateContactDTO';
import IUpdateContactDTO from '@modules/contacts/dtos/IUpdateContactDTO';
import Contact from '@modules/contacts/entities/Contact';
import { getRepository, Repository } from 'typeorm';
import IContactsRepository from '../interfaces/IContactsRepository';

export default class ContactsRepository implements IContactsRepository {
  private ormRepository: Repository<Contact>;

  constructor() {
    this.ormRepository = getRepository(Contact);
  }

  async createContact(data: ICreateContactDTO): Promise<Contact> {
    const contact = this.ormRepository.create(data);
    await this.ormRepository.save(contact);
    return contact;
  }

  async findAllContacts(): Promise<Contact[]> {
    const contacts = await this.ormRepository.find();
    return contacts;
  }

  async findByContactId(contactId: string): Promise<Contact | undefined> {
    const contact = await this.ormRepository.findOne({
      where: { id: contactId },
    });

    return contact;
  }

  async updateContact(data: IUpdateContactDTO): Promise<Contact> {
    const contact = await this.ormRepository.save(data);
    return contact;
  }
}
