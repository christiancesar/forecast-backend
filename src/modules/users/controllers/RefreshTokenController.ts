import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import auth from '../../../config/auth';
import {
  checkRefreshTokenIsValid,
  createRefreshToken,
  invalidateRefreshToken,
  users,
} from '../../../shared/database/database';

export default class RefreshTokenController {
  public async create(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const { refreshToken } = request.body;

    try {
      const userExists = users.find(user => user.id === userId);

      if (!userExists) {
        throw new Error('User not found!');
      }

      if (!refreshToken) {
        throw new Error('Refresh token is required!');
      }

      const isValidRefreshToken = checkRefreshTokenIsValid(
        userExists.email,
        refreshToken,
      );

      if (!isValidRefreshToken) {
        throw new Error('Refresh token is invalid.');
      }

      invalidateRefreshToken(userExists.email, refreshToken);

      const { secret, expiresIn } = auth.jwt;

      const token = sign({}, secret, {
        subject: userExists.id,
        expiresIn,
      });

      const newRefreshToken = createRefreshToken(userExists.email);

      return response.json({
        token,
        refreshToken: newRefreshToken,
      });
    } catch (error) {
      return response.status(401).json(error.message);
    }
  }
}
