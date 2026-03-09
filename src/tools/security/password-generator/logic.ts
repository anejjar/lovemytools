export interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

const CHARS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

export function generatePassword(options: PasswordOptions): string {
  const pool = [
    options.uppercase ? CHARS.uppercase : "",
    options.lowercase ? CHARS.lowercase : "",
    options.numbers ? CHARS.numbers : "",
    options.symbols ? CHARS.symbols : "",
  ].join("");

  if (!pool) return "";

  const array = new Uint32Array(options.length);
  crypto.getRandomValues(array);

  return Array.from(array)
    .map((n) => pool[n % pool.length])
    .join("");
}

export function calculateEntropy(options: PasswordOptions): number {
  const poolSize =
    (options.uppercase ? 26 : 0) +
    (options.lowercase ? 26 : 0) +
    (options.numbers ? 10 : 0) +
    (options.symbols ? CHARS.symbols.length : 0);

  if (poolSize === 0) return 0;
  return Math.round(options.length * Math.log2(poolSize));
}

export function getStrengthLabel(entropy: number): {
  label: string;
  color: string;
} {
  if (entropy < 28) return { label: "Very Weak", color: "#ef4444" };
  if (entropy < 36) return { label: "Weak", color: "#f97316" };
  if (entropy < 60) return { label: "Fair", color: "#f59e0b" };
  if (entropy < 80) return { label: "Strong", color: "#22c55e" };
  return { label: "Very Strong", color: "#10b981" };
}

export function generatePasswords(options: PasswordOptions, count: number): string[] {
  return Array.from({ length: count }, () => generatePassword(options));
}
