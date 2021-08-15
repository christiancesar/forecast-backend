import { getCustomRepository } from 'typeorm';
import UsersRepository from '../repositories/UsersRepository';

interface ValidatEmailRequest {
  email: string;
}
export default class EmailValidateService {
  public async execute({ email }: ValidatEmailRequest): Promise<boolean> {
    const usersRepository = getCustomRepository(UsersRepository);
    const emailAlreadyExist = await usersRepository.findOne({
      where: { email },
    });

    return !!emailAlreadyExist;
  }
}
