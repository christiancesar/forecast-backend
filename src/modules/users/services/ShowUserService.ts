import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import User from '../models/User';
import IUsersRepository from '../repositories/interfaces/IUsersRepository';

interface RequestDTO {
  userId: string;
}

@injectable()
export default class ShowUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ userId }: RequestDTO): Promise<User> {
    const user = await this.usersRepository.findByUserId(userId);

    if (!user) {
      throw new AppError('Sorry, but user not exist!');
    }

    return user;
  }
}
