import { ICreateUserDTO } from '@modules/users/dto/ICreateUserDTO';
import User from '@modules/users/models/User';

export default interface IUsersRepository {
  findAll(): Promise<User[]>;
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
