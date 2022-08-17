import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateItemService from '../services/items/CreateItemService';
import ListItemsService from '../services/items/ListItemsService';
import ShowItemService from '../services/items/ShowItemService';
import UpdateItemService from '../services/items/UpdateItemService';

export default class ItemsController {
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

    const createItemService = container.resolve(CreateItemService);

    const createdItem = await createItemService.execute({
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
    const listItemsService = container.resolve(ListItemsService);

    const items = await listItemsService.execute();

    return response.json(items);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { itemId } = request.params;

    const showItemService = container.resolve(ShowItemService);

    const item = await showItemService.execute({ itemId });

    return response.json(item);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const {
      itemId,
      name,
      model,
      brand,
      quantity,
      price,
      discontPercent,
      discontValue,
      totalPrice,
      comments,
      subItems,
    } = request.body;

    const updateItemService = container.resolve(UpdateItemService);

    const updatedItem = await updateItemService.execute({
      itemId,
      name,
      model,
      brand,
      quantity,
      price,
      discontPercent,
      discontValue,
      totalPrice,
      comments,
      subItems,
    });

    return response.json({ item: updatedItem });
  }
}
