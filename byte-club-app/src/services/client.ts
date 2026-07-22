import { Platform } from "react-native";

import { getAuthToken } from "@/services/token";

export const API_BASE_URL = process.env.EXPO_BASE_URL;

export async function apiRequest<T>(
  path: string,
  options: { method?: string; body?: unknown; auth?: boolean } = {},
): Promise<T> {
  const { method = "GET", body, auth = false } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (auth) {
    const token = getAuthToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error ?? "Something went wrong");
  }
  return data;
}
