import { container } from 'tsyringe';

import UsersRepository from '@modules/users/repositories/implementations/UsersRepository';
import IUsersRepository from '@modules/users/repositories/interfaces/IUsersRepository';

import RefreshTokenRepository from '@modules/users/repositories/implementations/RefreshTokenRepository';
import IRefreshTokenRepository from '@modules/users/repositories/interfaces/IRefreshTokenRepository';

import '@modules/users/providers';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IRefreshTokenRepository>(
  'RefreshTokenRepository',
  RefreshTokenRepository,
);
