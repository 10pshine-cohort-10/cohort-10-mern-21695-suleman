// API base URL — Vite exposes env vars prefixed with VITE_
const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api';

interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface AuthResponse {
  success: boolean;
  token?: string;
  user?: AuthUser;
  message?: string;
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    credentials: 'include', // send/receive httpOnly cookie
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const data = (await res.json()) as T;

  if (!res.ok) {
    const err = data as { message?: string };
    throw new Error(err.message ?? 'Something went wrong.');
  }

  return data;
}

export const authApi = {
  register: (body: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => request<AuthResponse>('/auth/register', { method: 'POST', body: JSON.stringify(body) }),

  login: (body: { email: string; password: string }) =>
    request<AuthResponse>('/auth/login', { method: 'POST', body: JSON.stringify(body) }),

  logout: () => request<{ success: boolean }>('/auth/logout', { method: 'POST' }),

  me: () => request<{ success: boolean; user: AuthUser }>('/auth/me'),
};
