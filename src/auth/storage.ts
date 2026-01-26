const KEY = "ff.access_token";
const EMAIL_KEY = "ff.email";

export function saveAuth(token: string, email: string) {
  localStorage.setItem(KEY, token);
  localStorage.setItem(EMAIL_KEY, email);
}

export function getToken(): string | null {
  return localStorage.getItem(KEY);
}
export function getEmail(): string | null {
  return localStorage.getItem(EMAIL_KEY);
}

export function clearAuth() {
  localStorage.removeItem(KEY);
  localStorage.removeItem(EMAIL_KEY);
}
