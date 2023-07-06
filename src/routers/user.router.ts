import { Router } from 'express';

import { RouterImpl } from './interfaces';
import { UserController } from '../controllers';

export const UserRouter: RouterImpl = () => {
  const prefix = '/users';
  const router = Router();

  const userController = UserController();

  router.get('/', userController.getUsers);
  router.get('/:id', userController.getUser);
  router.post('/', userController.createUser);
  router.patch('/:id', userController.updateUser);
  router.delete('/:id', userController.deleteUser);

  return { prefix, router };
};
