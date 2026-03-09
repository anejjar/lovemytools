export interface Base64Result {
  output: string;
  error: string | null;
}

export function encodeBase64(input: string, urlSafe = false): Base64Result {
  try {
    const encoded = btoa(
      encodeURIComponent(input).replace(/%([0-9A-F]{2})/g, (_, p1) =>
        String.fromCharCode(parseInt(p1, 16))
      )
    );
    const output = urlSafe
      ? encoded.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "")
      : encoded;
    return { output, error: null };
  } catch {
    return { output: "", error: "Failed to encode. Ensure input is valid text." };
  }
}

export function decodeBase64(input: string, urlSafe = false): Base64Result {
  try {
    let b64 = input.trim();
    if (urlSafe) {
      b64 = b64.replace(/-/g, "+").replace(/_/g, "/");
    }
    // Add padding
    const padded = b64.padEnd(Math.ceil(b64.length / 4) * 4, "=");
    const decoded = decodeURIComponent(
      atob(padded)
        .split("")
        .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join("")
    );
    return { output: decoded, error: null };
  } catch {
    return { output: "", error: "Invalid Base64 input. Check for typos or missing padding." };
  }
}

export function encodeFileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1] || result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function isValidBase64(str: string): boolean {
  try {
    return btoa(atob(str)) === str;
  } catch {
    return false;
  }
}
