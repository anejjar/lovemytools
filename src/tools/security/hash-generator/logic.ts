import CryptoJS from "crypto-js";

export type HashAlgorithm = "MD5" | "SHA1" | "SHA256" | "SHA512" | "SHA224" | "SHA384";

export interface HashResult {
  hash: string;
  error: string | null;
}

export function generateHash(input: string, algorithm: HashAlgorithm): HashResult {
  if (!input) return { hash: "", error: null };
  try {
    let hash: CryptoJS.lib.WordArray;
    switch (algorithm) {
      case "MD5":    hash = CryptoJS.MD5(input); break;
      case "SHA1":   hash = CryptoJS.SHA1(input); break;
      case "SHA224": hash = CryptoJS.SHA224(input); break;
      case "SHA256": hash = CryptoJS.SHA256(input); break;
      case "SHA384": hash = CryptoJS.SHA384(input); break;
      case "SHA512": hash = CryptoJS.SHA512(input); break;
      default:       return { hash: "", error: "Unknown algorithm" };
    }
    return { hash: hash.toString(CryptoJS.enc.Hex), error: null };
  } catch (e) {
    return { hash: "", error: (e as Error).message };
  }
}

export const ALGORITHMS: HashAlgorithm[] = ["MD5", "SHA1", "SHA224", "SHA256", "SHA384", "SHA512"];

export const HASH_LENGTHS: Record<HashAlgorithm, number> = {
  MD5: 32, SHA1: 40, SHA224: 56, SHA256: 64, SHA384: 96, SHA512: 128,
};
