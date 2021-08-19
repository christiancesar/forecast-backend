import { ICreateUserDTO } from '@modules/users/dto/ICreateUserDTO';
import { getRepository, Repository } from 'typeorm';
import User from '../../models/User';
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

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
      relations: ['address'],
    });
    return user;
  }

  async findByUserId(userId: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { id: userId } });
    return user;
  }

  public async createUser({
    email,
    firstName,
    lastName,
    password,
    phone,
    addressId,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      email,
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      password,
      phone,
      addressId,
    });

    await this.ormRepository.save(user);

    return user;
  }

  async saveUser(user: User): Promise<User> {
    const userUpdate = await this.ormRepository.save(user);
    return userUpdate;
  }
}
