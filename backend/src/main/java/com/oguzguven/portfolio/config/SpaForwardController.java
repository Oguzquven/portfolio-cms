package com.oguzguven.portfolio.config;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SpaForwardController {

    @GetMapping({"/admin", "/admin/", "/admin/login"})
    public String forwardAdminRoutes() {
        return "forward:/index.html";
    }
}
