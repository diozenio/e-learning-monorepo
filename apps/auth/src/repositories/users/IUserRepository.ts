export interface UserModel {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface IUserRepository {
  /**
   * Finds a user by their email address.
   * @param email - The email address of the user to find.
   * @returns A promise that resolves to the user if found, or null if not found.
   */
  findByEmail(email: string): Promise<UserModel | null>;

  /**
   * Creates a new user with the provided data.
   * @param userData - The data for the new user.
   * @returns A promise that resolves to the created user.
   */
  create(userData: {
    name: string;
    email: string;
    password: string;
  }): Promise<UserModel>;

  /**
   * Finds a user by their ID.
   * @param id - The ID of the user to find.
   * @returns A promise that resolves to the user if found, or null if not found.
   */
  findById(id: string): Promise<UserModel | null>;

  /**
   * Converts a user object to a UserModel.
   * @param user - The user object to convert.
   * @returns The converted UserModel.
   */
  toUser(_: unknown): UserModel;
}
