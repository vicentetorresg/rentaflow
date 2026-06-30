'use client';

const VALID_CREDENTIALS = { username: 'admin', password: 'admin' };

export function login(username: string, password: string): boolean {
  if (username === VALID_CREDENTIALS.username && password === VALID_CREDENTIALS.password) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('rentaflow_auth', 'true');
    }
    return true;
  }
  return false;
}

export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('rentaflow_auth');
  }
}

export function isAuthenticated(): boolean {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('rentaflow_auth') === 'true';
  }
  return false;
}
