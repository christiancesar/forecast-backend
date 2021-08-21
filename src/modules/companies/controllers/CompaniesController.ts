import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateCompanyService from '../services/CreateCompanyService';
import ListCompaniesService from '../services/ListCompaniesService';
import ShowCompanyService from '../services/ShowCompanyService';
import UpdateCompanyService from '../services/UpdateCompanyService';

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
      addressId,
    });

    return response.json(company);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listCompaniesService = container.resolve(ListCompaniesService);

    const companies = await listCompaniesService.execute();

    return response.json(companies);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { companyId } = request.params;

    const showCompanyService = container.resolve(ShowCompanyService);

    const company = await showCompanyService.execute({ companyId });

    return response.json(company);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      companyId,
      name,
      description,
      email,
      phones,
      isHeadquarters,
      stateRegistration,
      employerIdentificationNumber,
      addressId,
    } = request.body;

    const updateCompanyService = container.resolve(UpdateCompanyService);
    const company = await updateCompanyService.execute({
      companyId,
      name,
      description,
      email,
      phones,
      isHeadquarters,
      stateRegistration,
      employerIdentificationNumber,
      addressId,
    });
    return response.json(company);
  }
}
