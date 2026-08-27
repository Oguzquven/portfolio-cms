package com.oguzguven.portfolio.project;

import jakarta.validation.constraints.*;
import java.util.List;

public record ProjectRequest(
        @NotBlank @Size(max = 120) String title,
        @NotBlank @Size(max = 80) String type,
        @NotEmpty List<@NotBlank @Size(max = 60) String> technologies,
        @NotBlank @Size(max = 2000) String description,
        @Size(max = 500) String projectUrl,
        @NotBlank @Size(max = 40) String mockupType,
        @Size(max = 10_000_000) String coverImageUrl,
        boolean published,
        @Min(1) int displayOrder
) {}
