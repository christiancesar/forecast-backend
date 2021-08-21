import { celebrate, Segments, Joi } from 'celebrate';
import checkAuthenticated from '@shared/routes/middlewares/checkAuthenticated';
import { Router } from 'express';
import AuthenticationController from '../controllers/SessionControllers/AuthenticationController';
import RefreshTokenController from '../controllers/SessionControllers/RefreshTokenController';

const sessionsRouter = Router();

const authenticationController = new AuthenticationController();
const refreshTokenController = new RefreshTokenController();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  authenticationController.create,
);

sessionsRouter.post(
  '/refresh',
  checkAuthenticated,
  refreshTokenController.create,
);

export default sessionsRouter;
