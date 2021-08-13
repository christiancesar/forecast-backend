import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import ShowProfileService from '../services/ShowProfileService';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;

    const showProfileService = new ShowProfileService();

    const user = await showProfileService.execute({ userId });

    return response.json(classToClass(user));
  }
}
