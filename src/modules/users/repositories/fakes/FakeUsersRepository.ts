import { ICreateUserDTO } from '@modules/users/dto/ICreateUserDTO';
import { v4 as uuid } from 'uuid';
import User from '../../models/User';
import IUsersRepository from '../interfaces/IUsersRepository';

export default class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  async findAll(): Promise<User[]> {
    const { users } = this;
    return users;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const userFounder = this.users.find(user => user.email === email);
    return userFounder;
  }

  async findByUserId(userId: string): Promise<User | undefined> {
    const userFounder = this.users.find(user => user.id === userId);
    return userFounder;
  }

  public async createUser({
    email,
    firstName,
    lastName,
    password,
    phone,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      id: uuid(),
      email,
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      password,
      phone,
    });

    this.users.push(user);

    return user;
  }
}