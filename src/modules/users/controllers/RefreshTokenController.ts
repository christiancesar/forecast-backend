import { Request, Response } from 'express';
import RefreshTokenService from '../services/RefreshTokenService';

export default class RefreshTokenController {
  public async create(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;

    const { refreshToken } = request.body;

    const refreshTokenService = new RefreshTokenService();

    const { token, newRefreshToken } = await refreshTokenService.execute({
      userId,
      refreshToken,
    });

    return response.json({ token, refreshToken: newRefreshToken });
  }
}
