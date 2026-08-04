export type AuthSession = {
  role: string;
  token: string;
  email?: string;
};

const AUTH_SESSION_KEY = 'bouxdechoux_auth_session';

function isWebStorageAvailable() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

export function saveAuthSession(session: AuthSession) {
  if (!isWebStorageAvailable()) {
    return;
  }

  window.localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
}

export function loadAuthSession(): AuthSession | null {
  if (!isWebStorageAvailable()) {
    return null;
  }

  const rawSession = window.localStorage.getItem(AUTH_SESSION_KEY);
  if (!rawSession) {
    return null;
  }

  try {
    return JSON.parse(rawSession) as AuthSession;
  } catch {
    return null;
  }
}

export function clearAuthSession() {
  if (!isWebStorageAvailable()) {
    return;
  }

  window.localStorage.removeItem(AUTH_SESSION_KEY);
}

const AuthSession = {
  saveAuthSession,
  loadAuthSession,
  clearAuthSession,
};

export default AuthSession;
