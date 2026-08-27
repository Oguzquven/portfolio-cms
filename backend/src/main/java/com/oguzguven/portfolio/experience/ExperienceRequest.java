package com.oguzguven.portfolio.experience;

import jakarta.validation.constraints.*;
import java.util.List;

public record ExperienceRequest(
        @NotBlank @Size(max=120) String company,
        @NotBlank @Size(max=120) String role,
        @NotBlank @Pattern(regexp="^\\d{4}-(0[1-9]|1[0-2])$") String startDate,
        @NotBlank @Pattern(regexp="^\\d{4}-(0[1-9]|1[0-2])$") String endDate,
        @NotBlank @Size(max=2000) String description,
        @NotEmpty List<@NotBlank @Size(max=60) String> technologies,
        @Size(max=10_000_000) String logoUrl,
        boolean published,
        @Min(1) int displayOrder
) {}
