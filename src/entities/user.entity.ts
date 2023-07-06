import { UserEntity } from './interfaces';

export const User = {
  createOf(name: string, email: string): Partial<UserEntity> {
    return { name, email };
  },
};
