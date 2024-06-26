import { Prisma } from '@prisma/client';
import prisma from '@/prisma';
import { CredentialBody, UpdateEmailBody } from '@/types/user.type';

export class UserRepository {
  static async findUserByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } });
  }

  static async createUser(data: Prisma.UserCreateInput) {
    return await prisma.user.create({
      data,
    });
  }

  static async updateUserByEmail(email: string, data: Prisma.UserUpdateInput) {
    return await prisma.user.update({
      where: { email },
      data,
    });
  }

  static async deleteUserByEmail(email: string) {
    return await prisma.user.delete({ where: { email } });
  }

  static async getUserById(id: number) {
    return await prisma.user.findUnique({
      where: { id: id },
    });
  }

  static async changeUserProfileCredential(id: number, body: CredentialBody) {
    const { password, username } = body;
    return await prisma.user.update({
      where: { id },
      data: {
        password,
        username,
      },
    });
  }

  static async changeEmailUser(
    id: number,
    body: UpdateEmailBody,
    token: string,
  ) {
    const { email } = body;

    return await prisma.user.update({
      where: { id },
      data: {
        email: email,
        isVerified: false,
        jwtToken: token,
      },
    });
  }

  static async changeProfilPicture(id: number, file: Express.Multer.File) {
    return await prisma.user.update({
      where: {
        id,
      },
      data: {
        image: `/assets/profile/${file.filename}`,
      },
    });
  }

  static async activationAccount(email: string, data: Prisma.UserUpdateInput) {
    return await prisma.user.update({
      where: { email },
      data,
    });
  }

  static async updateUserById(id: number, data: Prisma.UserUpdateInput) {
    return await prisma.user.update({
      where: { id },
      data,
    });
  }

  static async deleteUserById(id: number) {
    return await prisma.user.delete({ where: { id } });
  }

  static async getAllUsers(query: any) {
    const { filter, limit, page, sortBy, orderBy } = query;

    const where = {
      OR: [{ username: { contains: filter } }, { email: { contains: filter } }],
    };

    const users = await prisma.user.findMany({
      where,
      take: Number(limit) || 10,
      skip: ((Number(page) || 1) - 1) * (Number(limit) || 10),
      orderBy: {
        [sortBy || 'email']: orderBy || 'asc',
      },
    });

    return users;
  }

  static async countUsers(filter: string) {
    const where = {
      OR: [{ username: { contains: filter } }, { email: { contains: filter } }],
    };

    return await prisma.user.count({ where });
  }
}
