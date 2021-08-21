import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import UsersRepository from '@modules/users/repositories/implementations/UsersRepository';
import IUsersRepository from '@modules/users/repositories/interfaces/IUsersRepository';

import RefreshTokenRepository from '@modules/users/repositories/implementations/RefreshTokenRepository';
import IRefreshTokenRepository from '@modules/users/repositories/interfaces/IRefreshTokenRepository';

import UsersTokensRepository from '@modules/users/repositories/implementations/UsersTokensRepository';
import IUsersTokensRepository from '@modules/users/repositories/interfaces/IUsersTokensRepository';

import AddressRepository from 'modules/address/repositories/implementations/AddressRepository';
import IAddressRepository from 'modules/address/repositories/interfaces/IAddressRepository';

import CompaniesRepository from '@modules/companies/repositories/implementations/CompaniesRepository';
import ICompaniesRepository from '@modules/companies/repositories/interfaces/ICompaniesRepository';

import ContactsRepository from '@modules/contacts/repositories/implementations/ContactsRepository';
import IContactsRepository from '@modules/contacts/repositories/interfaces/IContactsRepository';

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
  'AddressRepository',
  AddressRepository,
);

container.registerSingleton<ICompaniesRepository>(
  'CompaniesRepository',
  CompaniesRepository,
);

container.registerSingleton<IContactsRepository>(
  'ContactsRepository',
  ContactsRepository,
);
