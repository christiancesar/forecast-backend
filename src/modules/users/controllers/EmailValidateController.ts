import { Request, Response } from 'express';
import EmailValidateService from '../services/EmailValidateService';

export default class EmailValidateController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const emailValidateService = new EmailValidateService();

    const emailAlreadyExist = await emailValidateService.execute({ email });

    return response.json({ emailExist: emailAlreadyExist });
  }
}
