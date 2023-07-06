import { UserRepository } from '../repositories';

export const UserService = () => {
  const userRepository = UserRepository();

  const getUsers = async () => {
    return userRepository.find({});
  };

  const getUserById = async (id: number) => {
    return userRepository.findOne({ id });
  };

  return { getUsers, getUserById };
};
