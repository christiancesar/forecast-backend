import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import User from '../../entities/User';
import IUsersRepository from '../../repositories/interfaces/IUsersRepository';

interface ShowProfileRequest {
  userId: string;
}
@injectable()
export default class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ userId }: ShowProfileRequest): Promise<User> {
    const user = await this.usersRepository.findByUserId(userId);

    if (!user) {
      throw new AppError('User not exist');
    }

    return user;
  }
}
