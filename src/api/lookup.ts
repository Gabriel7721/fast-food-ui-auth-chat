const API_BASE = "http://localhost:9999";

export type IdName = { _id: string; name?: string; email?: string };

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
  });
  return handle<IdName[]>(res, "menu");
}
