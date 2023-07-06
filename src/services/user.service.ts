import { UserRepository } from '../repositories';

export const UserService = () => {
  const userRepository = UserRepository();

  const getUsers = async () => {
    return userRepository.find({});
  };

  return { getUsers };
};
