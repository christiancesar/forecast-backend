import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import checkAuthenticated from '@shared/routes/middlewares/checkAuthenticated';
import ConfirmationRegisterController from '../controllers/ConfirmationRegisterController';
import ResendEmailConfirmationRegisterController from '../controllers/ResendEmailConfirmationRegisterController';
import EmailValidateController from '../controllers/EmailValidateController';
import UsersController from '../controllers/UsersController';

const usersRouter = Router();

const usersController = new UsersController();
const confirmationRegisterController = new ConfirmationRegisterController();
const emailValidateController = new EmailValidateController();
const resendEmailConfirmationRegisterController =
  new ResendEmailConfirmationRegisterController();

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

usersRouter.patch(
  '/confirmation-register',
  confirmationRegisterController.update,
);

usersRouter.get(
  '/resend-email-confirmation-register',
  celebrate({
    [Segments.QUERY]: {
      userId: Joi.string().uuid().required(),
    },
  }),
  resendEmailConfirmationRegisterController.create,
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
