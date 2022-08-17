import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateSubItemService from '../services/subItems/CreateSubItemService';
import ListSubItemsService from '../services/subItems/ListSubItemsService';
import ShowSubItemService from '../services/subItems/ShowSubItemService';
import UpdateSubItemService from '../services/subItems/UpdateSubItemService';

export default class SubItemsController {
  async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      model,
      brand,
      quantity,
      price,
      discontPercent,
      discontValue,
      totalPrice,
      comments,
    } = request.body;

    const createSubItemService = container.resolve(CreateSubItemService);

    const createdItem = await createSubItemService.execute({
      name,
      model,
      brand,
      quantity,
      price,
      discontPercent,
      discontValue,
      totalPrice,
      comments,
    });

    return response.json({ item: createdItem });
  }

  async index(request: Request, response: Response): Promise<Response> {
    const listSubItemsService = container.resolve(ListSubItemsService);

    const items = await listSubItemsService.execute();

    return response.json(items);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { subItemId } = request.params;

    const showSubItemService = container.resolve(ShowSubItemService);

    const item = await showSubItemService.execute({ subItemId });

    return response.json(item);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const {
      subItemId,
      name,
      model,
      brand,
      quantity,
      price,
      discontPercent,
      discontValue,
      totalPrice,
      comments,
    } = request.body;

    const updateSubItemService = container.resolve(UpdateSubItemService);

    const updatedItem = await updateSubItemService.execute({
      subItemId,
      name,
      model,
      brand,
      quantity,
      price,
      discontPercent,
      discontValue,
      totalPrice,
      comments,
    });

    return response.json({ item: updatedItem });
  }
}
