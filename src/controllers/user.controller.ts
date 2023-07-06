import { Handler } from 'express';

import { HttpError, NotFoundError } from '../core';
import { UserService } from '../services';

import { GetUserParamsDto } from './user.dtos';

export const UserController = () => {
  const userService = UserService();

  const getUsers: Handler = async (_, res, __) => {
    return res.send(await userService.getUsers());
  };

  const getUser: Handler = async (req, res, __) => {
    try {
      const body = GetUserParamsDto(req.params);
      const user = await userService.getUserById(body.id);

      if (!user) {
        throw NotFoundError('not found user');
      }

      return res.send(user);
    } catch (e) {
      const error = e as HttpError;

      res.status(error.status).send(error);
    }
  };

  const createUser: Handler = (req, res, next) => {};
  const updateUser: Handler = (req, res, next) => {};
  const deleteUser: Handler = (req, res, next) => {};

  return { getUsers, getUser, createUser, updateUser, deleteUser };
};
