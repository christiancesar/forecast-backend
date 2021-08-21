import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ShowProfileService from '../services/ShowProfileService';
import UpdateProfileService from '../services/UpdateProfileService';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;

    const showProfileService = container.resolve(ShowProfileService);

    const user = await showProfileService.execute({ userId });

    return response.json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const {
      firstName,
      lastName,
      phone,
      email,
      individualTaxNumber,
      password,
      oldPassword,
      addressId,
    } = request.body;

    const updateProfileService = container.resolve(UpdateProfileService);

    const user = await updateProfileService.execute({
      userId,
      firstName,
      lastName,
      phone,
      email,
      individualTaxNumber,
      password,
      oldPassword,
      addressId,
    });

    return response.json(classToClass(user));
  }
}
