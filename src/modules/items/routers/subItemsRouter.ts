import { Router } from 'express';
import SubItemController from '../controllers/SubItemController';

const subItemsRouter = Router();
const subItemController = new SubItemController();

subItemsRouter.post('/', subItemController.create);
subItemsRouter.get('/:subItemId', subItemController.show);
subItemsRouter.get('/', subItemController.index);
subItemsRouter.post('/', subItemController.create);

export default subItemsRouter;
