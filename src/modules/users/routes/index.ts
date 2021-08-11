import { Router } from 'express';
import checkAuthenticated from '../../../shared/middlewares/checkAuthenticated';
import AuthenticationController from '../controllers/AuthenticationController';
import { RefreshTokenController } from '../controllers/RefreshTokenController';
import { UsersController } from '../controllers/UsersController';

const usersRouter = Router();

const authenticationController = new AuthenticationController();
const refreshTokenController = new RefreshTokenController();
const usersController = new UsersController();

usersRouter.get('/', usersController.index)
usersRouter.get('/:user_id', usersController.show)
usersRouter.post('/', usersController.create)

usersRouter.post('/sessions', authenticationController.create);

usersRouter.post('/refresh', checkAuthenticated, refreshTokenController.create);

export default usersRouter;
