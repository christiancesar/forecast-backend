import { Router } from 'express';
import usersRouter from '@modules/users/routes/users';
import profileRouter from '@modules/users/routes/profile';
import sessionsRouter from '@modules/users/routes/sessions';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/profile', profileRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
