import { Request, Response } from 'express';
import { container } from 'tsyringe';
import EmailValidateService from '../../services/EmailValidateService';

export default class EmailValidateController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const emailValidateService = container.resolve(EmailValidateService);

    const emailAlreadyExist = await emailValidateService.execute({ email });

    return response.json({ emailExist: emailAlreadyExist });
  }
}
