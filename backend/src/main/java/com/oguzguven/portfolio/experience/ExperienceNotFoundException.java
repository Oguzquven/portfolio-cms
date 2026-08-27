package com.oguzguven.portfolio.experience;
import java.util.UUID;
public class ExperienceNotFoundException extends RuntimeException {
    public ExperienceNotFoundException(UUID id) { super("Experience not found: " + id); }
}
