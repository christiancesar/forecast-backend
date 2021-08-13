import { Request, Response } from 'express';
import AuthenticationService from '../services/AuthenticationService';

export default class AuthenticationController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticationService = new AuthenticationService();
    const { token, refreshToken } = await authenticationService.execute({
      email,
      password,
    });

    return response.json({ token, refreshToken });
  }
}
