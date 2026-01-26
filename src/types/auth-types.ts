export type AuthResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

export type AuthState = {
  token: string | null;
  email: string | null;

  login(email: string, password: string): Promise<void>;
  register(email: string, password: string): Promise<void>;
  logout(): Promise<void>;
};
