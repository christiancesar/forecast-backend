import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../../repositories/interfaces/IUsersRepository';
import IUsersTokensRepository from '../../repositories/interfaces/IUsersTokensRepository';

interface IRequest {
  userId: string;
  token: string;
}

@injectable()
export default class ConfirmationRegisterService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
  ) {}

  async execute({ token, userId }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByUserId(userId);

    if (!user) {
      throw new AppError('User not exists!');
    }

    const userToken = await this.usersTokensRepository.findByTokenId(
      token,
      userId,
    );

    if (!userToken) {
      throw new AppError('Invalid token');
    }

    const currentDate = new Date();

    const { expiresIn } = userToken;

    expiresIn.setDate(expiresIn.getDate() + 1); // 24h

    if (currentDate.getDate() > expiresIn.getDate()) {
      throw new AppError('Token expired!');
    }

    user.confirmedEmail = true;

    await this.usersRepository.saveUser(user);
  }
}
