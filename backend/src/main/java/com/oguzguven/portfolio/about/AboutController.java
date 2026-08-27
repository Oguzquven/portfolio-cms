package com.oguzguven.portfolio.about;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/about") public class AboutController {
    private final AboutService service;
    public AboutController(AboutService service){this.service=service;}
    @GetMapping public AboutResponse get(){return service.get();}
    @PutMapping public AboutResponse update(@Valid @RequestBody AboutRequest request){return service.update(request);}
}
