import { celebrate, Segments, Joi } from 'celebrate';
import checkAuthenticated from '@shared/routes/middlewares/checkAuthenticated';
import { Router } from 'express';
import EmailValidateController from '../controllers/EmailValidateController';
import UsersController from '../controllers/UsersController';

const usersRouter = Router();

const usersController = new UsersController();

const emailValidateController = new EmailValidateController();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      phone: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.get(
  '/email',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  emailValidateController.show,
);

usersRouter.get('/', checkAuthenticated, usersController.index);

usersRouter.get(
  '/:userId',
  checkAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      userId: Joi.string().uuid().required(),
    },
  }),
  usersController.show,
);

export default usersRouter;
