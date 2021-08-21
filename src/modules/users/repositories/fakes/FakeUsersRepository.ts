import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { v4 as uuid } from 'uuid';
import User from '../../entities/User';
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
      confirmedEmail: false,
    } as User);

    this.users.push(user);

    return user;
  }

  async saveUser(user: User): Promise<User> {
    const userIndex = this.users.findIndex(element => element === user);
    this.users[userIndex] = user;
    return this.users[userIndex];
  }
}
