import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '../../services/users/CreateUserService';
import ListUserService from '../../services/users/ListUsersService';
import ShowUserService from '../../services/users/ShowUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, firstName, lastName, phone, password, addressId } =
      request.body;
    const createUserServive = container.resolve(CreateUserService);

    const user = await createUserServive.execute({
      email,
      firstName,
      lastName,
      password,
      phone,
      addressId,
    });

    return response.json(classToClass(user));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listUserService = container.resolve(ListUserService);
    const users = await listUserService.execute();

    return response.json(classToClass(users));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;
    const showUserService = container.resolve(ShowUserService);
    const users = await showUserService.execute({ userId });

    return response.json(classToClass(users));
  }
}
