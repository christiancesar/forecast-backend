import { inject, injectable } from 'tsyringe';
import User from '../../entities/User';
import IUsersRepository from '../../repositories/interfaces/IUsersRepository';

@injectable()
export default class ListUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(): Promise<User[]> {
    const user = await this.usersRepository.findAll();
    return user;
  }
}
