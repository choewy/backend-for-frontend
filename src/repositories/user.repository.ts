import { UserEntity } from '../entities';
import { database } from './database';
import { BaseRepositoryImpl } from './interfaces';

export const UserRepository = (): BaseRepositoryImpl<UserEntity> => {
  const getIndex = (): number => {
    database.users.index += 1;

    return database.users.index;
  };

  const find = async (
    conditions: Partial<UserEntity>,
  ): Promise<UserEntity[]> => {
    const fields = Object.keys(conditions) as Array<keyof UserEntity>;

    return database.users.rows.reduce<UserEntity[]>((rows, user) => {
      let result = true;

      for (const field of fields) {
        result = user[field] === conditions[field];

        if (!result) {
          break;
        }
      }

      if (result) {
        rows.push(user);
      }

      return rows;
    }, []);
  };

  const findOne = async (
    conditions: Partial<UserEntity>,
  ): Promise<UserEntity | null> => {
    const fields = Object.keys(conditions) as Array<keyof UserEntity>;
    const row = database.users.rows.find((user) => {
      let result = true;

      for (const field of fields) {
        result = user[field] === conditions[field];

        if (!result) {
          break;
        }
      }

      return result;
    });

    return row || null;
  };

  const insert = async (entity: Partial<UserEntity>): Promise<boolean> => {
    if (entity.id) {
      return false;
    }

    entity.id = getIndex();
    entity.createdAt = new Date();
    entity.updatedAt = new Date();

    database.users.rows.push(entity as UserEntity);

    return true;
  };

  const update = async (
    conditions: Partial<UserEntity>,
    data: Partial<UserEntity>,
  ): Promise<boolean> => {
    let affectedRows = 0;

    const fields = Object.keys(conditions) as Array<keyof UserEntity>;

    database.users.rows = database.users.rows.map((row) => {
      let result = true;

      for (const field of fields) {
        result = row[field] === conditions[field];

        if (!result) {
          return row;
        }
      }

      affectedRows += 1;

      row = Object.assign(row, data);
      row.updatedAt = new Date();

      return row;
    });

    return affectedRows > 0;
  };

  const save = async (entity: UserEntity) => {
    if (entity.id) {
      const prev = await findOne({ id: entity.id });

      if (prev) {
        entity.updatedAt = new Date();
      } else {
        entity.id = 0;
      }
    }

    if (!entity.id) {
      entity.id = getIndex();
      entity.createdAt = new Date();
      entity.updatedAt = new Date();
    }

    database.users.rows.push(entity);

    return entity;
  };

  return { find, findOne, insert, update, save };
};
