package com.oguzguven.portfolio.project;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.UUID;

@Service
@Transactional(readOnly = true)
public class ProjectService {
    private final ProjectRepository repository;

    public ProjectService(ProjectRepository repository) {
        this.repository = repository;
    }

    public List<ProjectResponse> findAll(boolean publishedOnly) {
        List<Project> projects = publishedOnly
                ? repository.findByPublishedTrueOrderByDisplayOrderAsc()
                : repository.findAllByOrderByDisplayOrderAsc();
        return projects.stream().map(ProjectResponse::from).toList();
    }

    public ProjectResponse findById(UUID id) {
        return ProjectResponse.from(findEntity(id));
    }

    @Transactional
    public ProjectResponse create(ProjectRequest request) {
        Project project = new Project(
                request.title(), request.type(), request.technologies(), request.description(),
                request.projectUrl(), request.mockupType(), request.coverImageUrl(),
                request.published(), request.displayOrder()
        );
        return ProjectResponse.from(repository.save(project));
    }

    @Transactional
    public ProjectResponse update(UUID id, ProjectRequest request) {
        Project project = findEntity(id);
        project.update(request.title(), request.type(), request.technologies(), request.description(),
                request.projectUrl(), request.mockupType(), request.coverImageUrl(),
                request.published(), request.displayOrder());
        return ProjectResponse.from(project);
    }

    @Transactional
    public ProjectResponse togglePublished(UUID id) {
        Project project = findEntity(id);
        project.togglePublished();
        return ProjectResponse.from(project);
    }

    @Transactional
    public void delete(UUID id) {
        repository.delete(findEntity(id));
    }

    private Project findEntity(UUID id) {
        return repository.findById(id).orElseThrow(() -> new ProjectNotFoundException(id));
    }
}
