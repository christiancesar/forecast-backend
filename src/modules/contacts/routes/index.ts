import { Router } from 'express';
import ContactsController from '../controllers/ContactsController';

const contactsRouter = Router();
const contactsController = new ContactsController();

contactsRouter.post('/', contactsController.create);
contactsRouter.get('/:contactId', contactsController.show);
contactsRouter.get('/', contactsController.index);
contactsRouter.patch('/', contactsController.update);

export default contactsRouter;
