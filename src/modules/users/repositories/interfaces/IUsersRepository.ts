import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import IUpdateUserDTO from '@modules/users/dtos/IUpdateUserDTO';
import User from '@modules/users/entities/User';

export default interface IUsersRepository {
  findAll(): Promise<User[]>;

  findAllUsersId(userIds: string[]): Promise<User[] | undefined>;

  findByEmail(email: string): Promise<User | undefined>;

  findByUserId(userId: string): Promise<User | undefined>;

  createUser(data: ICreateUserDTO): Promise<User>;

  updateUser(user: IUpdateUserDTO): Promise<User>;
}
