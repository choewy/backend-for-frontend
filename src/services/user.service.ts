import { User } from '../entities';
import { UserRepository } from '../repositories';

export const UserService = () => {
  const userRepository = UserRepository();

  const getList = async () => {
    return userRepository.find();
  };

  const getById = async (id: number) => {
    return userRepository.findOne({ id });
  };

  const hasById = async (id: number) => {
    return !!(await userRepository.findOne({ id }));
  };

  const hasByEmail = async (email: string) => {
    return !!(await userRepository.findOne({ email }));
  };

  const create = async (name: string, email: string) => {
    return userRepository.insert(User.createOf(name, email));
  };

  const updateById = async (id: number, name?: string, email?: string) => {
    return userRepository.update({ id }, { name, email });
  };

  const deleteById = async (id: number) => {
    return userRepository.delete({ id });
  };

  return {
    getList,
    getById,
    hasById,
    hasByEmail,
    create,
    updateById,
    deleteById,
  };
};
