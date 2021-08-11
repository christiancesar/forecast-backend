import { getCustomRepository } from 'typeorm';
import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

export default class ListUserService {
  public async execute(): Promise<User[]> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.find();
    return user;
  }
}
