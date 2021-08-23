import { Router } from 'express';
import ItemsController from '../controllers/ItemsController';

const subItemsRouter = Router();
const itemsController = new ItemsController();

subItemsRouter.post('/', itemsController.create);
subItemsRouter.get('/:subItemId', itemsController.show);
subItemsRouter.get('/', itemsController.index);
subItemsRouter.post('/', itemsController.create);

export default subItemsRouter;
