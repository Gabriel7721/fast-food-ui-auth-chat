import { getToken } from "../auth/storage";

const API_BASE = "http://localhost:9999";
const API_BASE_AUTH = "http://localhost:8888";

export type IdName = { _id: string; name?: string; email?: string };

function authHeaders(): Record<string, string> {
  const t = getToken();
  const headers: Record<string, string> = {};
  if (t) headers.Authorization = `Bearer ${t}`;
  return headers;
}

async function handle<T>(res: Response, label: string): Promise<T> {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`${label} ${res.status} ${text}`);
  }
  return res.json() as Promise<T>;
}

/**
 * GET /users  -> IdName[]
 * @param signal AbortSignal (tuỳ chọn)
 */
export async function fetchUsers(signal?: AbortSignal): Promise<IdName[]> {
  const res = await fetch(`${API_BASE}/auth/users`, {
    signal,
    headers: { ...authHeaders() },
  });
  return handle<IdName[]>(res, "users");
}

/**
 * GET /menu -> IdName[]
 * @param signal AbortSignal (tuỳ chọn)
 */
export async function fetchMenu(signal?: AbortSignal): Promise<IdName[]> {
  const res = await fetch(`${API_BASE}/menu`, {
    signal,
    headers: { ...authHeaders() },
  });
  return handle<IdName[]>(res, "menu");
}
