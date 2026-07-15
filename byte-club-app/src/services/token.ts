type Listener = () => void;

let authToken: string | null = null;
const listeners = new Set<Listener>();

export function setAuthToken(token: string | null) {
  authToken = token;
  listeners.forEach((listener) => listener());
}

export function getAuthToken() {
  return authToken;
}

export function subscribeAuthToken(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
