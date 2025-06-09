import { User } from '@prisma/client';

import { prisma } from '@/lib/prisma';

import { IUserRepository, UserModel } from './IUserRepository';

export class PrismaUserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<UserModel | null> {
    const userFromDb = await prisma.user.findUnique({ where: { email } });
    if (!userFromDb) {
      return null;
    }
    return this.toUser(userFromDb);
  }

  async create(userData: {
    name: string;
    email: string;
    password: string;
  }): Promise<UserModel> {
    const newUserFromDb = await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      },
    });

    return this.toUser(newUserFromDb);
  }

  async findById(id: string): Promise<UserModel | null> {
    const userFromDb = await prisma.user.findUnique({ where: { id } });
    if (!userFromDb) {
      return null;
    }
    return this.toUser(userFromDb);
  }

  toUser(prismaUser: User): UserModel {
    return {
      id: prismaUser.id,
      name: prismaUser.name,
      email: prismaUser.email,
      password: prismaUser.password,
    };
  }
}
