package com.oguzguven.portfolio.about;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Service public class AboutService {
    private final AboutRepository repository;
    public AboutService(AboutRepository repository){this.repository=repository;}
    @Transactional(readOnly=true) public AboutResponse get(){return AboutResponse.from(repository.findById(1L).orElseThrow());}
    @Transactional public AboutResponse update(AboutRequest request){var about=repository.findById(1L).orElseGet(()->new About(request));about.update(request);return AboutResponse.from(repository.save(about));}
}
