import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import UsersRepository from '@modules/users/repositories/implementations/UsersRepository';
import IUsersRepository from '@modules/users/repositories/interfaces/IUsersRepository';

import RefreshTokenRepository from '@modules/users/repositories/implementations/RefreshTokenRepository';
import IRefreshTokenRepository from '@modules/users/repositories/interfaces/IRefreshTokenRepository';

import UsersTokensRepository from '@modules/users/repositories/implementations/UsersTokensRepository';
import IUsersTokensRepository from '@modules/users/repositories/interfaces/IUsersTokensRepository';

import AddresRepository from 'modules/address/repositories/implementations/AddressRepository';
import IAddressRepository from 'modules/address/repositories/interfaces/IAddressRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IRefreshTokenRepository>(
  'RefreshTokenRepository',
  RefreshTokenRepository,
);

container.registerSingleton<IUsersTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository,
);

container.registerSingleton<IAddressRepository>(
  'AddresRepository',
  AddresRepository,
);
