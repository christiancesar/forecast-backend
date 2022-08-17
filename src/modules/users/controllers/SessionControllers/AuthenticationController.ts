import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticationService from '../../services/authentications/AuthenticationService';

export default class AuthenticationController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticationService = container.resolve(AuthenticationService);
    const { token, refreshToken } = await authenticationService.execute({
      email,
      password,
    });

    return response.json({ token, refreshToken });
  }
}
