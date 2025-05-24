import bcrypt from 'bcryptjs';

export async function hashPassword(plainText: string): Promise<string> {
  return bcrypt.hash(plainText, 8);
}

export async function comparePasswords(
  plainText: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(plainText, hash);
}
