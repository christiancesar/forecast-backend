import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

interface ShowProfileRequest {
  userId: string;
}

export default class ShowProfileService {
  public async execute({ userId }: ShowProfileRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new AppError('User not exist');
    }

    return user;
  }
}
