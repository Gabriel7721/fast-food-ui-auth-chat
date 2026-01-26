import type { Review } from "../types/menu-review-types";

import { getToken } from "../auth/storage";

const API_BASE = "http://localhost:9999";

function authHeaders(): Record<string, string> {
  const t = getToken();
  const h: Record<string, string> = {};
  if (t) h.Authorization = `Bearer ${t}`;
  return h;
}

export default async function fetchReviews(
  signal?: AbortSignal,
): Promise<Review[]> {
  const res = await fetch(`${API_BASE}/review`, {
    signal,
    headers: { ...authHeaders() },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Failed to fetch /review: ${res.status} ${text}`);
  }
  return res.json();
}
export async function createReview(payload: {
  user: string; // ObjectId
  item: string; // ObjectId
  rating: number; // 1..5
  comment: string;
}): Promise<Review> {
  const res = await fetch(`${API_BASE}/review`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Create failed: ${res.status} ${text}`);
  }
  return res.json();
}
export async function deleteReview(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/review/${id}`, {
    method: "DELETE",
    headers: { ...authHeaders() },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Delete failed: ${res.status} ${text}`);
  }
}
