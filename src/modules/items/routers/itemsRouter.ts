import { Router } from 'express';
import ItemsController from '../controllers/ItemsController';

const itemsRouter = Router();
const itemsController = new ItemsController();

itemsRouter.post('/', itemsController.create);
itemsRouter.get('/:itemId', itemsController.show);
itemsRouter.get('/', itemsController.index);
itemsRouter.patch('/', itemsController.update);

export default itemsRouter;
