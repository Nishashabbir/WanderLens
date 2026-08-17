const TOKEN_KEY = "wanderlens_token";

export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export async function request(path, { method = "GET", body, auth = false } = {}) {
  const headers = { "Content-Type": "application/json" };

  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error("Unable to reach the server. Is the backend running?");
  }

  const json = await response.json().catch(() => null);

  if (!response.ok || (json && json.success === false)) {
    const error = new Error(json?.message || `Request failed (${response.status})`);
    error.status = response.status;
    error.errors = json?.errors || [];
    throw error;
  }

  return json ? json.data : null;
}