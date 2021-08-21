import { Router } from 'express';
import usersRouter from '@modules/users/routes/users';
import profileRouter from '@modules/users/routes/profile';
import sessionsRouter from '@modules/users/routes/sessions';
import addressRouter from '@modules/address/routes';
import companiesRouter from '@modules/companies/routes';
import contactsRouter from '@modules/contacts/routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/profile', profileRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/address', addressRouter);
routes.use('/companies', companiesRouter);
routes.use('/contacts', contactsRouter);

export default routes;
