import { Router } from 'express';
import { RouterImpl } from './interfaces';
import { AppController } from '../controllers';

export const AppRouter: RouterImpl = () => {
  const prefix = '/app';
  const router = Router();

  const appController = AppController();

  router.get('/', appController.sayHi);
  router.get('/version', appController.getVersion);

  return { prefix, router };
};
