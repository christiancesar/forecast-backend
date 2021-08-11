import auth from '../config/auth';
import { checkRefreshTokenIsValid, createRefreshToken, invalidateRefreshToken, users } from '../database';
import { Request, response, Response, Router } from 'express';
import { sign } from 'jsonwebtoken';
import checkAuthenticated from '../middlewares/checkAuthenticated';

const routes = Router();

routes.post('/sessions', (request: Request, response: Response) => {
  const { email, password } = request.body;

  try {
    const userExists = users.find(user => user.email === email);

    if (!userExists) {
      throw new Error("User not exists!");
    }

    if (userExists.password !== password) {
      throw new Error("Email or password incorrect!");
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
});

routes.post('/refresh', checkAuthenticated, (request: Request, response: Response) => {
  const userId = request.user.id;
  const { refreshToken } = request.body;

  try {
    const userExists = users.find(user => user.id === userId);

    if (!userExists) {
      throw new Error("User not found!");
    }

    if (!refreshToken) {
      throw new Error("Refresh token is required!");
    }

    const isValidRefreshToken = checkRefreshTokenIsValid(userExists.email, refreshToken)

    if (!isValidRefreshToken) {
      throw new Error("Refresh token is invalid.");
    }

    invalidateRefreshToken(userExists.email, refreshToken)

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
})


export default routes;
