import { BadRequestError } from '../core';

export const GetUserParamsDto = (params: any) => {
  if (!params.id) {
    throw BadRequestError('not exist id in parameters.');
  }

  const id = Number(params.id);

  if (isNaN(id)) {
    throw BadRequestError('id is not a number.');
  }

  if (id < 1) {
    throw BadRequestError('id must greater than 0.');
  }

  return { id };
};
