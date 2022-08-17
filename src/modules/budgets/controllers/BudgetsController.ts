export default class BudggetController {
  async create(request: Request, response: Response): Promise<Response> {
    const { budget } = request.body;

    return response.json();
  }

  async index(request: Request, response: Response): Promise<Response> {
    return response.json();
  }

  async show(request: Request, response: Response): Promise<Response> {
    return response.json();
  }

  async update(request: Request, response: Response): Promise<Response> {
    return response.json();
  }
}
