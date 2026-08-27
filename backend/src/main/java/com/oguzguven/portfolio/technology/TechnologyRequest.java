package com.oguzguven.portfolio.technology;
import jakarta.validation.constraints.*;
public record TechnologyRequest(@NotBlank @Size(max=80) String name,@NotBlank @Size(max=100) String slug,
 @Size(max=10_000_000) String iconUrl,@Pattern(regexp="^$|^#[0-9a-fA-F]{6}$") String color,
 boolean published,@Min(1) int displayOrder) {}
