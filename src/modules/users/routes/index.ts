import { Router } from 'express';
import checkAuthenticated from '@shared/middlewares/checkAuthenticated';
import AuthenticationController from '../controllers/AuthenticationController';
import RefreshTokenController from '../controllers/RefreshTokenController';
import UsersController from '../controllers/UsersController';
import ProfileController from '../controllers/ProfileController';
import EmailValidateController from '../controllers/EmailValidateController';

const usersRouter = Router();

const authenticationController = new AuthenticationController();
const refreshTokenController = new RefreshTokenController();
const usersController = new UsersController();
const profileController = new ProfileController();
const emailValidateController = new EmailValidateController();
usersRouter.post('/', usersController.create);

usersRouter.get('/emailvalidate', emailValidateController.show);

usersRouter.get('/', checkAuthenticated, usersController.index);

usersRouter.get('/me', checkAuthenticated, profileController.show);

usersRouter.get('/:userId', checkAuthenticated, usersController.show);

// sessions
usersRouter.post('/sessions', authenticationController.create);

usersRouter.post('/refresh', checkAuthenticated, refreshTokenController.create);

export default usersRouter;
