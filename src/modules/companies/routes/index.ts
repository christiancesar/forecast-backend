import { Router } from 'express';
import CompaniesController from '../controllers/CompaniesController';

const companiesRouter = Router();

const companiesController = new CompaniesController();

companiesRouter.post('/', companiesController.create);
companiesRouter.get('/', companiesController.index);
companiesRouter.get('/:companyId', companiesController.show);
companiesRouter.patch('/', companiesController.update);

export default companiesRouter;
