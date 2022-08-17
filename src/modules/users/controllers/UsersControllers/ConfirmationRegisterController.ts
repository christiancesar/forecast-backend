import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ConfirmationRegisterService from '../../services/users/ConfirmationRegisterService';

export default class ConfirmationRegisterController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { token, userId } = request.body;

    const confirmationRegisterService = container.resolve(
      ConfirmationRegisterService,
    );

    await confirmationRegisterService.execute({ token, userId });

    return response.status(204).json();
  }
}
