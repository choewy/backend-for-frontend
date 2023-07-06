import { UserEntity } from '../entities';

export interface Database {
  users: {
    index: number;
    rows: UserEntity[];
  };
}

export interface BaseRepositoryImpl<T> {
  find(conditions?: Partial<T>): Promise<T[]>;
  findOne(conditions?: Partial<T>): Promise<T | null>;
  insert(entity: Partial<T>): Promise<boolean>;
  update(conditions: Partial<T>, entity: Partial<T>): Promise<boolean>;
  save(entity: T): Promise<T>;
  delete(conditions: Partial<T>): Promise<boolean>;
}
