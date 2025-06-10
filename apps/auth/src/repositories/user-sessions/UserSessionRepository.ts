import { UserSession } from '@prisma/client';

import { prisma } from '@/lib/prisma';
import { redis } from '@/lib/redis';

import {
  IUserSessionRepository,
  UserSessionModel,
} from './IUserSessionRepository';

export class UserSessionRepository implements IUserSessionRepository {
  private readonly REDIS_SESSION_PREFIX = 'user_session:';

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

    const sessionModel = this.toUserSession(newUserSession);

    const redisKey = `${this.REDIS_SESSION_PREFIX}${sessionModel.token}`;
    const expiresInSeconds = Math.ceil(
      (sessionModel.expiresAt.getTime() - Date.now()) / 1000
    );

    if (expiresInSeconds > 0) {
      await redis.set(
        redisKey,
        JSON.stringify(sessionModel),
        'EX',
        expiresInSeconds
      );
    }

    return sessionModel;
  }

  async findByToken(token: string): Promise<UserSessionModel | null> {
    const redisKey = `${this.REDIS_SESSION_PREFIX}${token}`;

    const cachedSession = await redis.get(redisKey);
    if (cachedSession) {
      return JSON.parse(cachedSession) as UserSessionModel;
    }

    await new Promise((resolve) => setTimeout(resolve, 3000));

    const session = await prisma.userSession.findUnique({
      where: { token },
    });

    if (!session) {
      return null;
    }

    const sessionModel = this.toUserSession(session);

    const expiresInSeconds = Math.ceil(
      (sessionModel.expiresAt.getTime() - Date.now()) / 1000
    );

    if (expiresInSeconds > 0) {
      await redis.set(
        redisKey,
        JSON.stringify(sessionModel),
        'EX',
        expiresInSeconds
      );
    }

    return sessionModel;
  }

  async delete(token: string): Promise<void> {
    await prisma.userSession.delete({
      where: { token },
    });

    const redisKey = `${this.REDIS_SESSION_PREFIX}${token}`;
    await redis.del(redisKey);
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
