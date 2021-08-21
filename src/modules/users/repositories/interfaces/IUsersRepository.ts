import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import User from '@modules/users/entities/User';

export default interface IUsersRepository {
  findAll(): Promise<User[]>;

  findAllUsersId(userIds: string[]): Promise<User[] | undefined>;

  findByEmail(email: string): Promise<User | undefined>;

  findByUserId(userId: string): Promise<User | undefined>;

  createUser({
    email,
    firstName,
    lastName,
    password,
    phone,
  }: ICreateUserDTO): Promise<User>;

  saveUser(user: User): Promise<User>;
}
