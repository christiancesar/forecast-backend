import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateContactService from '../services/CreateContactService';
import ListContactsService from '../services/ListContactsService';
import ShowContactService from '../services/ShowContactService';
import UpdateContactService from '../services/UpdateContactService';

export default class ContactsController {
  async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      phones,
      stateRegistration,
      employerIdentificationNumber,
      companyId,
    } = request.body;

    const createContactService = container.resolve(CreateContactService);

    const contact = await createContactService.execute({
      name,
      email,
      phones,
      stateRegistration,
      employerIdentificationNumber,
      companyId,
    });

    return response.json(contact);
  }

  async index(request: Request, response: Response): Promise<Response> {
    const listContactsService = container.resolve(ListContactsService);
    const contacts = await listContactsService.execute();

    return response.json(contacts);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { contactId } = request.params;
    const showContactService = container.resolve(ShowContactService);
    const contact = await showContactService.execute({ contactId });
    return response.json(contact);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const {
      contactId,
      name,
      email,
      phones,
      stateRegistration,
      employerIdentificationNumber,
      companyId,
    } = request.body;

    const updateContactService = container.resolve(UpdateContactService);
    const contact = await updateContactService.execute({
      contactId,
      name,
      email,
      phones,
      stateRegistration,
      employerIdentificationNumber,
      companyId,
    });

    return response.json(contact);
  }
}
