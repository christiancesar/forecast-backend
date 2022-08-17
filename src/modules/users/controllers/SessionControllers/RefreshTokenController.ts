import { Request, Response } from 'express';
import { container } from 'tsyringe';
import RefreshTokenService from '../../services/authentications/RefreshTokenService';

export default class RefreshTokenController {
  public async create(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;

    const { refreshToken } = request.body;

    const refreshTokenService = container.resolve(RefreshTokenService);

    const { token, newRefreshToken } = await refreshTokenService.execute({
      userId,
      refreshToken,
    });

    return response.json({ token, refreshToken: newRefreshToken });
  }
}
