import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/interfaces/IUsersRepository';

interface ValidatEmailRequest {
  email: string;
}

@injectable()
export default class EmailValidateService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ email }: ValidatEmailRequest): Promise<boolean> {
    const emailAlreadyExist = await this.usersRepository.findByEmail(email);

    return !!emailAlreadyExist;
  }
}
