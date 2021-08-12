import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

interface RequestDTO {
  userId: string;
}

export default class ShowUserService {
  public async execute({ userId }: RequestDTO): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new AppError('Sorry, but user not exist!');
    }

    return user;
  }
}
