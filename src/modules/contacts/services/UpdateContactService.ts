import ICompaniesRepository from '@modules/companies/repositories/interfaces/ICompaniesRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Contact from '../entities/Contact';
import IContactsRepository from '../repositories/interfaces/IContactsRepository';

interface IRequest {
  contactId: string;
  email: string;
  employerIdentificationNumber: string;
  name: string;
  phones: string[];
  stateRegistration: string;
  companyId: string;
}

@injectable()
export default class UpdateContactService {
  constructor(
    @inject('ContactsRepository')
    private contactsRepository: IContactsRepository,

    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
  ) {}

  async execute({
    contactId,
    email,
    employerIdentificationNumber,
    name,
    phones,
    stateRegistration,
    companyId,
  }: IRequest): Promise<Contact> {
    const company = await this.companiesRepository.findByCompanyId(companyId);

    if (!company) {
      throw new AppError('Company not exists!');
    }

    const contactExist = await this.contactsRepository.findByContactId(
      contactId,
    );

    if (!contactExist) {
      throw new AppError('Contact not exists!');
    }

    const contact = await this.contactsRepository.updateContact({
      contactId,
      email,
      employerIdentificationNumber,
      name,
      phones,
      stateRegistration,
      company,
    });

    return contact;
  }
}
