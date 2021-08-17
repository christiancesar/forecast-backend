import checkAuthenticated from '@shared/routes/middlewares/checkAuthenticated';
import { Router } from 'express';
import EmailValidateController from '../controllers/EmailValidateController';
import UsersController from '../controllers/UsersController';

const usersRouter = Router();

const usersController = new UsersController();

const emailValidateController = new EmailValidateController();
usersRouter.post('/', usersController.create);

usersRouter.get('/emailvalidate', emailValidateController.show);

usersRouter.get('/', checkAuthenticated, usersController.index);

usersRouter.get('/:userId', checkAuthenticated, usersController.show);

export default usersRouter;
