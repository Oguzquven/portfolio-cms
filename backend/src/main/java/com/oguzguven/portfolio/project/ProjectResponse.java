package com.oguzguven.portfolio.project;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

public record ProjectResponse(
        UUID id, String title, String type, List<String> technologies,
        String description, String projectUrl, String mockupType, String coverImageUrl,
        boolean published, int displayOrder, Instant createdAt, Instant updatedAt
) {
    public static ProjectResponse from(Project project) {
        return new ProjectResponse(
                project.getId(), project.getTitle(), project.getType(), project.getTechnologies(),
                project.getDescription(), project.getProjectUrl(), project.getMockupType(),
                project.getCoverImageUrl(), project.isPublished(), project.getDisplayOrder(),
                project.getCreatedAt(), project.getUpdatedAt()
        );
    }
}
