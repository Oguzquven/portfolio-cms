package com.oguzguven.portfolio.experience;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface ExperienceRepository extends JpaRepository<Experience, UUID> {
    List<Experience> findAllByOrderByDisplayOrderAsc();
    List<Experience> findByPublishedTrueOrderByDisplayOrderAsc();
}
