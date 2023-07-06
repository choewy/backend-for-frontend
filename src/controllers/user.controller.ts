import { Handler } from 'express';

import { UserService } from '../services';

export const UserController = () => {
  const userService = UserService();

  const getUsers: Handler = async (_, res, __) => {
    return res.send({ rows: await userService.getUsers() });
  };

  const getUser: Handler = (req, res, next) => {};

  const createUser: Handler = (req, res, next) => {};
  const updateUser: Handler = (req, res, next) => {};
  const deleteUser: Handler = (req, res, next) => {};

  return { getUsers, getUser, createUser, updateUser, deleteUser };
};
