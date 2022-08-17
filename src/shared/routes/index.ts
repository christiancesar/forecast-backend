import { Router } from 'express';
import usersRouter from '@modules/users/routes/users';
import profileRouter from '@modules/users/routes/profile';
import sessionsRouter from '@modules/users/routes/sessions';
import addressRouter from '@modules/address/routes';
import companiesRouter from '@modules/companies/routes';
import contactsRouter from '@modules/contacts/routes';
import itemsRouter from '@modules/items/routers/itemsRouter';
import subItemsRouter from '@modules/items/routers/subItemsRouter';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/profile', profileRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/address', addressRouter);
routes.use('/companies', companiesRouter);
routes.use('/contacts', contactsRouter);
routes.use('/items', itemsRouter);
routes.use('/subitems', subItemsRouter);

export default routes;
