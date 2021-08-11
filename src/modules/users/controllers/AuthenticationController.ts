import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import auth from '../../../config/auth';
import { createRefreshToken, users } from '../../../shared/database/database';

export default class AuthenticationController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    try {
      const userExists = users.find(user => user.email === email);

      if (!userExists) {
        throw new Error('User not exists!');
      }

      if (userExists.password !== password) {
        throw new Error('Email or password incorrect!');
      }

      const { secret, expiresIn } = auth.jwt;

      const token = sign({}, secret, {
        subject: userExists.id,
        expiresIn,
      });

      const refreshToken = createRefreshToken(userExists.email);

      return response.json({ user: userExists, token, refreshToken });
    } catch (error) {
      return response.status(401).json(error.message);
    }
  }
}
