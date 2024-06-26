import { UserRepository } from '@/repositories/user.repository';
import { responseWithoutData, responseWithData, responseDataWithPagination } from '@/utils/response';
import { hashPassword } from '@/utils/hash';
import { UserValidation } from '@/validators/user.validation';
import { Validation } from '@/validators/validation';

export class AdminService {
  static async getUsers(query: any) {
    const { filter, limit, page, sortBy, orderBy } = Validation.validate(UserValidation.QUERY, query);
    const defaultPage = page || 1;
    const defaultLimit = limit || 10;
    const defaultFilter = filter || '';
    const defaultSortBy = sortBy || 'email';
    const defaultOrderBy = orderBy || 'asc';

    const users = await UserRepository.getAllUsers({
      filter: defaultFilter,
      limit: defaultLimit,
      page: defaultPage,
      sortBy: defaultSortBy,
      orderBy: defaultOrderBy,
    });

    const total = await UserRepository.countUsers(defaultFilter);

    return responseDataWithPagination(200, 'Success Get Users', users, {
      page: defaultPage,
      limit: defaultLimit,
      total,
    });
  }

  static async createUser(body: any) {
    const { username, email, password } = Validation.validate(UserValidation.CREATE, body);

    const existingUser = await UserRepository.findUserByEmail(email);
    if (existingUser) {
      return responseWithoutData(400, false, 'Email already exists');
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await UserRepository.createUser({
      username,
      email,
      password: hashedPassword,
      role: 'ADMIN',
    });

    return responseWithData(201, 'Success Create User', newUser);
  }

  static async updateUser(id: number, body: any) {
    const { username, email, password } = Validation.validate(UserValidation.UPDATE, body);

    const existingUser = await UserRepository.getUserById(id);
    if (!existingUser) {
      return responseWithoutData(404, false, 'User not found');
    }

    const updatedData: any = { username, email };
    if (password) {
      updatedData.password = await hashPassword(password);
    }

    const updatedUser = await UserRepository.updateUserById(id, updatedData);

    return responseWithData(200, 'Success Update User', updatedUser);
  }

  static async deleteUser(id: number) {
    const existingUser = await UserRepository.getUserById(id);
    if (!existingUser) {
      return responseWithoutData(404, false, 'User not found');
    }

    await UserRepository.deleteUserById(id);

    return responseWithoutData(200, true, 'Success Delete User');
  }
}
