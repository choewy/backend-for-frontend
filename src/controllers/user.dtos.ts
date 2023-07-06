import { BadRequestError } from '../core';

export const GetUserParamsDto = (params: any) => {
  if (!params.id) {
    throw BadRequestError('not exist id in parameters');
  }

  const id = Number(params.id);

  if (isNaN(id)) {
    throw BadRequestError('id is not a number');
  }

  if (id < 1) {
    throw BadRequestError('id must greater than 0');
  }

  return { id };
};

export const CreateUserDto = (body: any) => {
  if (!body.email) {
    throw BadRequestError('email is empty');
  }

  if (!/^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/.test(body.email)) {
    throw BadRequestError('invalid email format');
  }

  const email = body.email as string;

  if (!body.name) {
    throw BadRequestError('name is empty');
  }

  if (!/^[가-힣]{2,4}$/.test(body.name)) {
    throw BadRequestError('invalid name format');
  }

  const name = body.name as string;

  return { name, email };
};

export const UpdateUserDto = (body: any) => {
  if (
    body.email &&
    !/^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/.test(body.email)
  ) {
    throw BadRequestError('invalid email format');
  }

  const email = body.email as string | undefined;

  if (body.name && !/^[가-힣]{2,4}$/.test(body.name)) {
    throw BadRequestError('invalid name format');
  }

  const name = body.name as string | undefined;

  return { name, email };
};
