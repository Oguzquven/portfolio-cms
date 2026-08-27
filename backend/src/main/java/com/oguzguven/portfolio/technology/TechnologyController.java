package com.oguzguven.portfolio.technology;
import jakarta.validation.Valid;import org.springframework.http.HttpStatus;import org.springframework.web.bind.annotation.*;import java.util.*;
@RestController @RequestMapping("/api/technologies")
public class TechnologyController{
 private final TechnologyService service;public TechnologyController(TechnologyService service){this.service=service;}
 @GetMapping public List<TechnologyResponse> all(@RequestParam(defaultValue="false") boolean publishedOnly){return service.all(publishedOnly);}
 @PostMapping @ResponseStatus(HttpStatus.CREATED) public TechnologyResponse create(@Valid @RequestBody TechnologyRequest r){return service.create(r);}
 @PutMapping("/{id}") public TechnologyResponse update(@PathVariable UUID id,@Valid @RequestBody TechnologyRequest r){return service.update(id,r);}
 @PatchMapping("/{id}/publication") public TechnologyResponse toggle(@PathVariable UUID id){return service.toggle(id);}
 @DeleteMapping("/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) public void delete(@PathVariable UUID id){service.delete(id);}
}
