import checkAuthenticated from '@shared/routes/middlewares/checkAuthenticated';
import { Router } from 'express';
import ProfileController from '../controllers/ProfileController';

export const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.get('/me', checkAuthenticated, profileController.show);

export default profileRouter;
