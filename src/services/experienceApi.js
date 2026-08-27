const URL = "/api/experiences";

async function request(url, options = {}) {
  const response = await fetch(url, {
    headers: options.body ? { "Content-Type": "application/json" } : undefined,
    ...options,
  });
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.message || `İstek başarısız oldu (${response.status})`);
  }
  return response.status === 204 ? null : response.json();
}

export const getExperiences = (publishedOnly = false) => request(`${URL}?publishedOnly=${publishedOnly}`);
export const createExperience = (value) => request(URL, { method: "POST", body: JSON.stringify(value) });
export const updateExperience = (id, value) => request(`${URL}/${id}`, { method: "PUT", body: JSON.stringify(value) });
export const toggleExperiencePublication = (id) => request(`${URL}/${id}/publication`, { method: "PATCH" });
export const deleteExperience = (id) => request(`${URL}/${id}`, { method: "DELETE" });
