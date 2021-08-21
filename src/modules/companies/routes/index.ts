import { Router } from 'express';
import CompaniesController from '../controllers/CompaniesController';

const companiesRouter = Router();

const companiesController = new CompaniesController();

companiesRouter.post('/', companiesController.create);

export default companiesRouter;
