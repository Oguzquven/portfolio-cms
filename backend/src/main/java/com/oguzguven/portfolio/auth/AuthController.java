package com.oguzguven.portfolio.auth;
import java.util.Map;import org.springframework.security.core.Authentication;import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/auth") public class AuthController{@GetMapping("/me")public Map<String,Object> me(Authentication authentication){boolean authenticated=authentication!=null&&authentication.isAuthenticated()&&!"anonymousUser".equals(authentication.getName());return authenticated?Map.of("authenticated",true,"email",authentication.getName()):Map.of("authenticated",false);}}
