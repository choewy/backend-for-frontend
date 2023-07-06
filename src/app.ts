import express, { Express, json, urlencoded } from 'express';
import cors from 'cors';

import { RouterImpl } from './routers';

export const createApp = (): Express => {
  const app = express();

  app.use(cors());
  app.use(json());
  app.use(urlencoded({ extended: true }));

  return app;
};

export const useRouters = (app: Express, ...Routers: RouterImpl[]): void => {
  Routers.forEach((Router) => {
    const router = Router();

    app.use(router.prefix, router.router);
  });
};
