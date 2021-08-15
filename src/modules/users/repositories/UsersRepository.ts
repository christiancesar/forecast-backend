import { EntityRepository, Repository } from 'typeorm';
import User from '../models/User';

interface UserDTO {
  fullName: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
}

@EntityRepository(User)
export default class UsersRepository extends Repository<User> {
  public async createUser(data: UserDTO): Promise<User> {
    const user = this.create(data);

    this.save(user);

    return user;
  }
}
