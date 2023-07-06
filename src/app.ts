import express, { Express } from 'express';
import cors from 'cors';

import { RouterImpl } from './routers';

export const createApp = (): Express => {
  const app = express();

  app.use(cors());

  return app;
};

export const useRouters = (app: Express, ...Routers: RouterImpl[]): void => {
  Routers.forEach((Router) => {
    const router = Router();

    app.use(router.prefix, router.router);
  });
};
