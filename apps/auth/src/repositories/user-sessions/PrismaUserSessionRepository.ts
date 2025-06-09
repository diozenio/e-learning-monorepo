import { UserSession } from '@prisma/client';

import { prisma } from '@/lib/prisma';

import {
  IUserSessionRepository,
  UserSessionModel,
} from './IUserSessionRepository';

export class PrismaUserSessionRepository implements IUserSessionRepository {
  async create(data: {
    userId: string;
    token: string;
    expiresAt: Date;
  }): Promise<UserSessionModel> {
    const newUserSession = await prisma.userSession.create({
      data: {
        userId: data.userId,
        token: data.token,
        expiresAt: data.expiresAt,
      },
    });
    return this.toUserSession(newUserSession);
  }

  async findByToken(token: string): Promise<UserSessionModel | null> {
    const session = await prisma.userSession.findUnique({
      where: { token },
    });
    return session ? this.toUserSession(session) : null;
  }

  async delete(token: string): Promise<void> {
    await prisma.userSession.delete({
      where: { token },
    });
  }

  toUserSession(prismaUserSession: UserSession): UserSessionModel {
    return {
      id: prismaUserSession.id,
      userId: prismaUserSession.userId,
      token: prismaUserSession.token,
      expiresAt: prismaUserSession.expiresAt,
      createdAt: prismaUserSession.createdAt,
      updatedAt: prismaUserSession.updatedAt,
    };
  }
}
