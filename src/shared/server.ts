import { errors } from 'celebrate';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import './containers';
import createConnection from './database';
import routes from './routes';
import interceptErrorMiddleware from './routes/middlewares/interceptErrorMiddleware';

createConnection();

const server = express();

server.use(cors());
server.use(express.json());

server.use(routes);

server.use(errors());

server.use(interceptErrorMiddleware);

server.listen(process.env.PORT, () => {
  console.log(`🚀 Forecast started on port ${process.env.PORT}! 🤑`);
});
