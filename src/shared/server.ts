import cors from 'cors';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import './database';
import AppError from './errors/AppError';
import routes from './routes';

const server = express();

server.use(cors());
server.use(express.json());

server.use(routes);

server.use(
  (err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    console.error(err);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

server.listen(process.env.PORT, () => {
  console.log(`🚀 Forecast started on port ${process.env.PORT}! 🤑`);
});
