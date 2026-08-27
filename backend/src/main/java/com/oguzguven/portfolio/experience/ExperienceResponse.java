package com.oguzguven.portfolio.experience;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

public record ExperienceResponse(UUID id, String company, String role, String startDate, String endDate,
        String description, List<String> technologies, String logoUrl, boolean published,
        int displayOrder, Instant createdAt, Instant updatedAt) {
    static ExperienceResponse from(Experience value) {
        return new ExperienceResponse(value.getId(), value.getCompany(), value.getRole(), value.getStartDate(),
                value.getEndDate(), value.getDescription(), value.getTechnologies(), value.getLogoUrl(),
                value.isPublished(), value.getDisplayOrder(), value.getCreatedAt(), value.getUpdatedAt());
    }
}
