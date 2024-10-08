import bcrypt from 'bcryptjs';

export function hashPassword(password: string) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

export function verifyPassword(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
}
