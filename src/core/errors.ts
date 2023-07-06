import { HttpError } from './interfaces';

export const BadRequestError = (message: string): HttpError => {
  return {
    status: 400,
    name: BadRequestError.name,
    message,
  };
};

export const NotFoundError = (message: string): HttpError => {
  return {
    status: 404,
    name: NotFoundError.name,
    message,
  };
};

export const UnauthorizedError = (message: string): HttpError => {
  return {
    status: 401,
    name: UnauthorizedError.name,
    message,
  };
};

export const ForbiddenError = (message: string): HttpError => {
  return {
    status: 403,
    name: ForbiddenError.name,
    message,
  };
};
