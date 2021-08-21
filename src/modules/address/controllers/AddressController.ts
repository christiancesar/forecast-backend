import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateAddressService from '../services/CreateAddressService';
import ListAddressService from '../services/ListAddressService';
import ShowAddressService from '../services/ShowAddressService';
import UpdateAddressService from '../services/UpdateAddressService';

export default class AddressController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      street,
      number,
      complement,
      reference,
      district,
      city,
      state,
      stateAcronym,
      postalCode,
      latitude,
      longitude,
    } = request.body;

    const createAddressService = container.resolve(CreateAddressService);

    const address = await createAddressService.execute({
      street,
      number,
      complement,
      reference,
      district,
      city,
      state,
      stateAcronym,
      postalCode,
      latitude,
      longitude,
    });

    return response.json(address);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listAddressService = container.resolve(ListAddressService);
    const address = await listAddressService.execute();
    return response.json(address);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { addressId } = request.params;

    const showAddressService = container.resolve(ShowAddressService);

    const address = await showAddressService.execute({ addressId });

    return response.json(address);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      addressId,
      street,
      number,
      complement,
      reference,
      district,
      city,
      state,
      stateAcronym,
      postalCode,
      latitude,
      longitude,
    } = request.body;

    const updateAddressService = container.resolve(UpdateAddressService);
    const address = await updateAddressService.execute({
      addressId,
      street,
      number,
      complement,
      reference,
      district,
      city,
      state,
      stateAcronym,
      postalCode,
      latitude,
      longitude,
    });

    return response.json(address);
  }
}
