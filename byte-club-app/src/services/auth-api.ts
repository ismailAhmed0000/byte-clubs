import { apiRequest } from "./client";

export type AuthUser = {
  id: number;
  name: string;
  email: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export function registerUser(payload: RegisterPayload) {
  return apiRequest<{ message: string; token: string }>("/auth/register", {
    method: "POST",
    body: payload,
  });
}

export function loginUser(payload: LoginPayload) {
  return apiRequest<{ message: string; token: string }>("/auth/login", {
    method: "POST",
    body: payload,
  });
}

export function getCurrentUser() {
  return apiRequest<AuthUser>("/auth/me", { method: "GET", auth: true });
}
