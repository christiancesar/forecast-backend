import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateCompanyService from '../services/CreateCompanyService';

export default class ComapniesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      description,
      isHeadquarters,
      email,
      phones,
      stateRegistration,
      employerIdentificationNumber,
      owners,
      addressId,
    } = request.body;

    const createCompanyService = container.resolve(CreateCompanyService);

    const company = await createCompanyService.execute({
      name,
      description,
      isHeadquarters,
      email,
      phones,
      stateRegistration,
      employerIdentificationNumber,
      owners,
      addressId,
    });

    return response.json(company);
  }
}
