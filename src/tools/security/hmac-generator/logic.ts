import CryptoJS from "crypto-js";

export type HmacAlgorithm = "SHA256" | "SHA512" | "SHA1" | "MD5";

export interface HmacResult {
  hash: string;
  error: string | null;
}

export function generateHmac(message: string, secret: string, algorithm: HmacAlgorithm): HmacResult {
  if (!message || !secret) return { hash: "", error: null };
  try {
    let hash: CryptoJS.lib.WordArray;
    switch (algorithm) {
      case "SHA256": hash = CryptoJS.HmacSHA256(message, secret); break;
      case "SHA512": hash = CryptoJS.HmacSHA512(message, secret); break;
      case "SHA1":   hash = CryptoJS.HmacSHA1(message, secret); break;
      case "MD5":    hash = CryptoJS.HmacMD5(message, secret); break;
      default: return { hash: "", error: "Unknown algorithm" };
    }
    return { hash: hash.toString(CryptoJS.enc.Hex), error: null };
  } catch (e) {
    return { hash: "", error: (e as Error).message };
  }
}

export const HMAC_ALGORITHMS: HmacAlgorithm[] = ["SHA256", "SHA512", "SHA1", "MD5"];
