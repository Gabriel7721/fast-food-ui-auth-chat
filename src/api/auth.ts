import type { AuthResponse } from "../types/auth-types";

const AUTH_BASE = "http://localhost:8888/auth";

export async function register(
  email: string,
  password: string,
): Promise<AuthResponse> {
  const res = await fetch(`${AUTH_BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  return res.json();
}
export async function login(
  email: string,
  password: string,
): Promise<AuthResponse> {
  const res = await fetch(`${AUTH_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Login failed: ${res.status}: ${text}`);
  }

  return res.json();
}
