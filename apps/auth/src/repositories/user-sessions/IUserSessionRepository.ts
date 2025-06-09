import { UserSession } from '@prisma/client';

export interface UserSessionModel {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserSessionRepository {
  /**
   * Creates a new session for a user.
   * @param data The session data to be created.
   * @returns A promise that resolves to the created session.
   */
  create(data: {
    userId: string;
    token: string;
    expiresAt: Date;
  }): Promise<UserSessionModel>;

  /**
   * Finds a session by its token.
   * @param token The session token.
   * @returns A promise that resolves to the found session or null.
   */
  findByToken(token: string): Promise<UserSessionModel | null>;

  /**
   * Deletes a session by its token.
   * @param token The session token to be deleted.
   * @returns A promise that resolves when the session is deleted.
   */
  delete(token: string): Promise<void>;

  /**
   * Converts a Prisma UserSession object to a UserModel.
   * @param prismaUserSession The Prisma UserSession object.
   * @returns The converted UserModel.
   */
  toUserSession(prismaUserSession: UserSession): UserSessionModel;
}
