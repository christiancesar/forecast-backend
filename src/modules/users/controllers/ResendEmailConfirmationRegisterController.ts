import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ResendEmailRegisterService from '../services/ResendEmailRegisterService';

export default class ResendEmailConfirmationRegisterController {
  async create(request: Request, response: Response): Promise<Response> {
    const { userId } = request.query;

    const resendEmailRegisterService = container.resolve(
      ResendEmailRegisterService,
    );

    await resendEmailRegisterService.execute({ userId: String(userId) });

    return response.status(204).json();
  }
}
