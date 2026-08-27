package com.oguzguven.portfolio.technology;
import org.springframework.stereotype.Service;import org.springframework.transaction.annotation.Transactional;import java.util.*;
@Service @Transactional(readOnly=true)
public class TechnologyService{
 private final TechnologyRepository repository; public TechnologyService(TechnologyRepository repository){this.repository=repository;}
 public List<TechnologyResponse> all(boolean publishedOnly){var list=publishedOnly?repository.findByPublishedTrueOrderByDisplayOrderAsc():repository.findAllByOrderByDisplayOrderAsc();return list.stream().map(TechnologyResponse::from).toList();}
 @Transactional public TechnologyResponse create(TechnologyRequest r){return TechnologyResponse.from(repository.save(new Technology(r.name(),r.slug(),r.iconUrl(),r.color(),r.published(),r.displayOrder())));}
 @Transactional public TechnologyResponse update(UUID id,TechnologyRequest r){var t=find(id);t.update(r.name(),r.slug(),r.iconUrl(),r.color(),r.published(),r.displayOrder());return TechnologyResponse.from(t);}
 @Transactional public TechnologyResponse toggle(UUID id){var t=find(id);t.toggle();return TechnologyResponse.from(t);}
 @Transactional public void delete(UUID id){repository.delete(find(id));}
 private Technology find(UUID id){return repository.findById(id).orElseThrow(()->new TechnologyNotFoundException(id));}
}
