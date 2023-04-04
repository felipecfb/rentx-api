/* eslint-disable import/no-extraneous-dependencies */
import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';
import '@shared/container';

import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import swaggerUI from 'swagger-ui-express';

import upload from '@config/upload';
import * as Sentry from '@sentry/node';
import { AppError } from '@shared/errors/AppError';

import swaggerFile from '../../../swagger.json';
import rateLimiter from './middlewares/rateLimiter';
import { router } from './routes';

const app = express();

app.use(rateLimiter);

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Express({
      app,
    }),
  ],
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler() as express.RequestHandler);
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`));
app.use('/cars', express.static(`${upload.tmpFolder}/cars`));

app.use(cors());

app.use(router);

app.use(Sentry.Handlers.errorHandler() as express.ErrorRequestHandler);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`,
  });
});

export { app };
