package com.oguzguven.portfolio.auth;

import java.io.IOException;
import jakarta.servlet.*;import jakarta.servlet.http.*;
import org.springframework.http.MediaType;
import org.springframework.web.filter.OncePerRequestFilter;

public class LoginRateLimitFilter extends OncePerRequestFilter {
 private final LoginAttemptService attempts;
 public LoginRateLimitFilter(LoginAttemptService attempts){this.attempts=attempts;}
 @Override protected boolean shouldNotFilter(HttpServletRequest request){return !("POST".equalsIgnoreCase(request.getMethod())&&"/api/auth/login".equals(request.getRequestURI()));}
 @Override protected void doFilterInternal(HttpServletRequest request,HttpServletResponse response,FilterChain chain)throws ServletException,IOException{if(attempts.isBlocked(request.getRemoteAddr())){response.setStatus(429);response.setContentType(MediaType.APPLICATION_JSON_VALUE);response.getWriter().write("{\"message\":\"Çok fazla başarısız giriş denemesi. Lütfen daha sonra tekrar deneyin.\"}");return;}chain.doFilter(request,response);}
}
