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
  return apiRequest<{ message: string; token: string }>("/Auth/register", {
    method: "POST",
    body: payload,
  });
}

export function loginUser(payload: LoginPayload) {
  return apiRequest<{ message: string; token: string }>("/Auth/login", {
    method: "POST",
    body: payload,
  });
}
