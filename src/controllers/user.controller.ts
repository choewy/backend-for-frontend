import { Handler } from 'express';

import { BadRequestError, HttpError, NotFoundError } from '../core';
import { UserService } from '../services';

import { CreateUserDto, GetUserParamsDto } from './user.dtos';

export const UserController = () => {
  const userService = UserService();

  /** @test curl -X GET http://localhost:4000/users */
  const getUsers: Handler = async (_, res, __) => {
    res.send(await userService.getList());
  };

  /** @test curl -X GET http://localhost:4000/users/1' */
  const getUser: Handler = async (req, res, __) => {
    try {
      const params = GetUserParamsDto(req.params);
      const user = await userService.getById(params.id);

      if (!user) {
        throw NotFoundError('not found user');
      }

      res.send(user);
    } catch (e) {
      const error = e as HttpError;

      res.status(error.status).send(error);
    }
  };

  /** 
   * @test curl -X POST http://localhost:4000/users \
    -H "Content-Type: application/json" \
    -d '{"email":"choewy32@gmail.com", "name":"최원영"}'
  */
  const createUser: Handler = async (req, res, __) => {
    try {
      const body = CreateUserDto(req.body);

      if (await userService.hasByEmail(body.email)) {
        throw BadRequestError('already exist email');
      }

      await userService.create(body.name, body.email);

      res.status(201).send();
    } catch (e) {
      const error = e as HttpError;

      res.status(error.status).send(error);
    }
  };

  const updateUser: Handler = (req, res, next) => {};
  const deleteUser: Handler = (req, res, next) => {};

  return { getUsers, getUser, createUser, updateUser, deleteUser };
};
