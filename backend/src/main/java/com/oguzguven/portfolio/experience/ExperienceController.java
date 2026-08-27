package com.oguzguven.portfolio.experience;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController @RequestMapping("/api/experiences")
public class ExperienceController {
    private final ExperienceService service;
    public ExperienceController(ExperienceService service) { this.service = service; }
    @GetMapping public List<ExperienceResponse> all(@RequestParam(defaultValue="false") boolean publishedOnly) { return service.findAll(publishedOnly); }
    @PostMapping @ResponseStatus(HttpStatus.CREATED) public ExperienceResponse create(@Valid @RequestBody ExperienceRequest r) { return service.create(r); }
    @PutMapping("/{id}") public ExperienceResponse update(@PathVariable UUID id, @Valid @RequestBody ExperienceRequest r) { return service.update(id,r); }
    @PatchMapping("/{id}/publication") public ExperienceResponse toggle(@PathVariable UUID id) { return service.toggle(id); }
    @DeleteMapping("/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) public void delete(@PathVariable UUID id) { service.delete(id); }
}
