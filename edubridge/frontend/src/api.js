const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return data;
}

export const api = {
  // --- auth ---
  login: (payload) => request("/auth/login", { method: "POST", body: JSON.stringify(payload) }),
  signup: (payload) => request("/auth/signup", { method: "POST", body: JSON.stringify(payload) }),

  // --- doubt chat ---
  chat: (message) => request("/chat", { method: "POST", body: JSON.stringify({ message }) }),

  // --- teachhub (student, no login) ---
  searchTeachers: (query) => request(`/teachers?query=${encodeURIComponent(query || "")}`),
  joinTest: (code, name) => request("/tests/join", { method: "POST", body: JSON.stringify({ code, name }) }),
  submitAttempt: (testId, name, answers) =>
    request(`/tests/${testId}/attempts`, { method: "POST", body: JSON.stringify({ name, answers }) }),

  // --- teacher dashboard ---
  getMyTests: (teacherId) => request(`/tests?teacherId=${encodeURIComponent(teacherId)}`),
  getTest: (id) => request(`/tests/${id}`),
  generateTest: (payload) => request("/tests/generate", { method: "POST", body: JSON.stringify(payload) }),
  publishTest: (payload) => request("/tests", { method: "POST", body: JSON.stringify(payload) }),
  concludeTest: (id) => request(`/tests/${id}/conclude`, { method: "PATCH" }),
  unpublishTest: (id) => request(`/tests/${id}`, { method: "DELETE" }),

  // --- public doubt board ---
  listDoubts: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/doubts${qs ? `?${qs}` : ""}`);
  },
  postDoubt: (payload) => request("/doubts", { method: "POST", body: JSON.stringify(payload) }),
  postAnswer: (doubtId, payload) =>
    request(`/doubts/${doubtId}/answers`, { method: "POST", body: JSON.stringify(payload) }),
  likeAnswer: (doubtId, answerId, studentId) =>
    request(`/doubts/${doubtId}/answers/${answerId}/like`, {
      method: "POST",
      body: JSON.stringify({ studentId }),
    }),
  getDoubtLeaderboard: () => request("/doubts/leaderboard"),
};
