import { createHmac } from "crypto";

const SALT = process.env.SUBSCRIPTION_SALT || "default-salt-do-not-use-in-prod";

export function generateSubscriptionHash(email: string): string {
  return createHmac("sha256", SALT).update(email.toLowerCase()).digest("hex");
}

export function verifySubscriptionHash(email: string, hash: string): boolean {
  if (!email || !hash) return false;
  const expectedHash = generateSubscriptionHash(email);
  return expectedHash === hash;
}

