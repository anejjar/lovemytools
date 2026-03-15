import bcrypt from "bcryptjs";

export interface HashResult {
  hash: string;
  error: string | null;
}

export interface VerifyResult {
  match: boolean;
  error: string | null;
}

export function hashBcrypt(password: string, rounds: number): HashResult {
  if (!password) return { hash: "", error: null };
  try {
    const salt = bcrypt.genSaltSync(rounds);
    const hash = bcrypt.hashSync(password, salt);
    return { hash, error: null };
  } catch (e) {
    return { hash: "", error: (e as Error).message };
  }
}

export function verifyBcrypt(password: string, hash: string): VerifyResult {
  if (!password || !hash) return { match: false, error: null };
  // bcrypt hashes must start with $2b$, $2a$, or $2y$
  if (!/^\$2[aby]\$\d{2}\$/.test(hash)) {
    return { match: false, error: "Invalid bcrypt hash format" };
  }
  try {
    const match = bcrypt.compareSync(password, hash);
    return { match, error: null };
  } catch (e) {
    return { match: false, error: "Invalid bcrypt hash format" };
  }
}

export const ROUND_OPTIONS = [8, 10, 12, 14] as const;
export type BcryptRounds = typeof ROUND_OPTIONS[number];
