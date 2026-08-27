package com.oguzguven.portfolio.experience;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.UUID;

@Service @Transactional(readOnly=true)
public class ExperienceService {
    private final ExperienceRepository repository;
    public ExperienceService(ExperienceRepository repository) { this.repository = repository; }
    public List<ExperienceResponse> findAll(boolean publishedOnly) {
        var values = publishedOnly ? repository.findByPublishedTrueOrderByDisplayOrderAsc()
                : repository.findAllByOrderByDisplayOrderAsc();
        return values.stream().map(ExperienceResponse::from).toList();
    }
    @Transactional public ExperienceResponse create(ExperienceRequest r) {
        return ExperienceResponse.from(repository.save(new Experience(r.company(), r.role(), r.startDate(), r.endDate(),
                r.description(), r.technologies(), r.logoUrl(), r.published(), r.displayOrder())));
    }
    @Transactional public ExperienceResponse update(UUID id, ExperienceRequest r) {
        var value = find(id); value.update(r.company(), r.role(), r.startDate(), r.endDate(), r.description(),
                r.technologies(), r.logoUrl(), r.published(), r.displayOrder()); return ExperienceResponse.from(value);
    }
    @Transactional public ExperienceResponse toggle(UUID id) { var value=find(id); value.togglePublished(); return ExperienceResponse.from(value); }
    @Transactional public void delete(UUID id) { repository.delete(find(id)); }
    private Experience find(UUID id) { return repository.findById(id).orElseThrow(() -> new ExperienceNotFoundException(id)); }
}
