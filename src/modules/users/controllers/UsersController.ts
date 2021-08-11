import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import ListUserService from '../services/ListUserService';
import ShowUserService from '../services/ShowUserService';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUserService = new ListUserService();
    const users = await listUserService.execute();

    return response.json(users);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;
    const showUserService = new ShowUserService();
    const users = await showUserService.execute({ userId: user_id });

    return response.json(users);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { email, individualTaxNumber, firstName, lastName, phone, password } =
      request.body;
    const createUserServive = new CreateUserService();
    const user = await createUserServive.execute({
      email,
      firstName,
      individualTaxNumber,
      lastName,
      password,
      phone,
    });

    return response.json(user);
  }
}
