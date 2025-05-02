// client/src/api.js
const BASE = "/api";

async function request(path, opts = {}) {
  const res = await fetch(BASE + path, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    ...opts,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message);
  }
  return res.json();
}

export const auth = {
  register: (data) =>
    request("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  login: (data) =>
    request("/auth/login", { method: "POST", body: JSON.stringify(data) }),
  logout: () => request("/auth/logout", { method: "POST" }),
};

export const users = {
  list: () => request("/users"),
  me: () => request("/users/me"),
  get: (id) => request(`/users/${id}`),
  update: (id, data) =>
    request(`/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
};
