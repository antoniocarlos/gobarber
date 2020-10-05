import { Request, Response } from 'express';
import ListProviderService from '@modules/appointments/services/ListProviderService';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

export default class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listProvider = container.resolve(ListProviderService);

    const providers = await listProvider.execute({
      user_id,
    });

    return response.json(classToClass(providers));
  }
}
