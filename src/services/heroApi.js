const URL = "/api/hero";

async function request(url, options = {}) {
  const response = await fetch(url, {
    headers: options.body ? { "Content-Type": "application/json" } : undefined,
    ...options,
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.message || `İstek başarısız oldu (${response.status})`);
  }

  return response.json();
}

export const getHero = () => request(URL);
export const updateHero = (value) => request(URL, {
  method: "PUT",
  body: JSON.stringify(value),
});
