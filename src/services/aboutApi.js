const URL = "/api/about";
async function request(options = {}) {
  const response = await fetch(URL, { headers: options.body ? { "Content-Type": "application/json" } : undefined, ...options });
  if (!response.ok) { const body = await response.json().catch(() => null); throw new Error(body?.message || `İstek başarısız oldu (${response.status})`); }
  return response.json();
}
export const getAbout = () => request();
export const updateAbout = (value) => request({ method: "PUT", body: JSON.stringify(value) });
