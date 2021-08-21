import ICompaniesRepository from '@modules/companies/repositories/interfaces/ICompaniesRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Contact from '../entities/Contact';
import IContactsRepository from '../repositories/interfaces/IContactsRepository';

@injectable()
export default class ListContactsService {
  constructor(
    @inject('ContactsRepository')
    private contactsRepository: IContactsRepository,

    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
  ) {}

  async execute(): Promise<Contact[]> {
    const contacts = await this.contactsRepository.findAllContacts();

    return contacts;
  }
}
