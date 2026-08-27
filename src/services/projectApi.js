const PROJECTS_URL = "/api/projects";

function fromApi(project) {
  return {
    ...project,
    coverImage: project.coverImageUrl || "",
    coverImageName: "",
  };
}

function toApi(project) {
  return {
    title: project.title,
    type: project.type,
    technologies: project.technologies,
    description: project.description,
    projectUrl: project.projectUrl || "#",
    mockupType: project.mockupType,
    coverImageUrl: project.coverImage || "",
    published: project.published,
    displayOrder: project.displayOrder,
  };
}

async function request(url, options = {}) {
  const response = await fetch(url, {
    headers: options.body ? { "Content-Type": "application/json" } : undefined,
    ...options,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(errorBody?.message || `İstek başarısız oldu (${response.status})`);
  }

  return response.status === 204 ? null : response.json();
}

export function getProjects({ publishedOnly = false } = {}) {
  return request(`${PROJECTS_URL}?publishedOnly=${publishedOnly}`).then((projects) =>
    projects.map(fromApi),
  );
}

export function createProject(project) {
  return request(PROJECTS_URL, {
    method: "POST",
    body: JSON.stringify(toApi(project)),
  }).then(fromApi);
}

export function updateProject(id, project) {
  return request(`${PROJECTS_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify(toApi(project)),
  }).then(fromApi);
}

export function toggleProjectPublication(id) {
  return request(`${PROJECTS_URL}/${id}/publication`, { method: "PATCH" }).then(fromApi);
}

export function deleteProject(id) {
  return request(`${PROJECTS_URL}/${id}`, { method: "DELETE" });
}
