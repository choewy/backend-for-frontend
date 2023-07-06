import { UserEntity } from './interfaces';

export const User = (
  id: number,
  name: string,
  email: string,
  createdAt: Date,
  updatedAt: Date,
): UserEntity => {
  return { id, name, email, createdAt, updatedAt };
};
