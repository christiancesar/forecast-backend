import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { getRepository, In, Repository } from 'typeorm';
import User from '../../entities/User';
import IUsersRepository from '../interfaces/IUsersRepository';

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  async findAll(): Promise<User[]> {
    const users = await this.ormRepository.find();
    return users;
  }

  async findAllUsersId(userIds: string[]): Promise<User[] | undefined> {
    const users = await this.ormRepository.find({ id: In(userIds) });
    return users;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });
    return user;
  }

  async findByUserId(userId: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { id: userId },
    });
    return user;
  }

  public async createUser({
    email,
    firstName,
    lastName,
    password,
    phone,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      email,
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      password,
      phone,
    });

    await this.ormRepository.save(user);

    return user;
  }

  async saveUser(user: User): Promise<User> {
    const userUpdate = await this.ormRepository.save(user);
    return userUpdate;
  }
}
