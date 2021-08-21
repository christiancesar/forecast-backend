import ICompaniesRepository from '@modules/companies/repositories/interfaces/ICompaniesRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Contact from '../entities/Contact';
import IContactsRepository from '../repositories/interfaces/IContactsRepository';

interface IRequest {
  contactId: string;
}

@injectable()
export default class ShowContactService {
  constructor(
    @inject('ContactsRepository')
    private contactsRepository: IContactsRepository,

    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
  ) {}

  async execute({ contactId }: IRequest): Promise<Contact> {
    const contact = await this.contactsRepository.findByContactId(contactId);

    if (!contact) {
      throw new AppError('Contact not exists!');
    }

    return contact;
  }
}
