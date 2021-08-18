import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ConfirmationRegisterService from '../services/ConfirmationRegisterService';

export default class ConfirmationRegisterController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { token, userId } = request.params;

    const confirmationRegisterService = container.resolve(
      ConfirmationRegisterService,
    );

    confirmationRegisterService.execute({ token, userId });

    return response.status(204).json();
  }
}
