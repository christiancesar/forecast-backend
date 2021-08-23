import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateItemService from '../services/CreateItemService';
import ListItemsService from '../services/ListItemsService';
import ShowItemService from '../services/ShowItemService';
import UpdateItemService from '../services/UpdateItemService';

export default class ItemsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { item } = request.body;

    const createItemService = container.resolve(CreateItemService);

    const createdItem = await createItemService.execute({ item });

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
    const { item } = request.body;

    const updateItemService = container.resolve(UpdateItemService);

    const updatedItem = await updateItemService.execute({ item });

    return response.json({ item: updatedItem });
    return response.json();
  }
}
