import checkAuthenticated from '@shared/routes/middlewares/checkAuthenticated';
import { Router } from 'express';
import AuthenticationController from '../controllers/AuthenticationController';
import RefreshTokenController from '../controllers/RefreshTokenController';

const sessionsRouter = Router();

const authenticationController = new AuthenticationController();
const refreshTokenController = new RefreshTokenController();

sessionsRouter.post('/', authenticationController.create);

sessionsRouter.post(
  '/refresh',
  checkAuthenticated,
  refreshTokenController.create,
);

export default sessionsRouter;
