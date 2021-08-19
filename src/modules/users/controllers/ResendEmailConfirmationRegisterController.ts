import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SendEmailRegisterService from '../services/SendEmailRegisterService';

export default class ResendEmailConfirmationRegisterController {
  async create(request: Request, response: Response): Promise<Response> {
    const { userId } = request.body;

    const sendEmailRegisterService = container.resolve(
      SendEmailRegisterService,
    );

    await sendEmailRegisterService.execute({ userId });

    return response.status(204).json();
  }
}
