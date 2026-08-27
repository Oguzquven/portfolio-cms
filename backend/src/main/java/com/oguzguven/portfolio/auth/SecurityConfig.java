package com.oguzguven.portfolio.auth;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.*;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {
 @Bean PasswordEncoder passwordEncoder(){return new BCryptPasswordEncoder();}
 @Bean UserDetailsService users(@Value("${portfolio.admin.email}") String email,@Value("${portfolio.admin.password}") String password,PasswordEncoder encoder){return new InMemoryUserDetailsManager(User.withUsername(email).password(encoder.encode(password)).roles("ADMIN").build());}
 @Bean SecurityFilterChain security(HttpSecurity http,LoginAttemptService attempts)throws Exception{
  http.csrf(csrf->csrf.disable())
   .authorizeHttpRequests(auth->auth
    .requestMatchers("/api/auth/login","/api/auth/logout","/api/auth/me","/h2-console/**").permitAll()
    .requestMatchers(HttpMethod.POST,"/api/messages").permitAll()
    .requestMatchers(HttpMethod.GET,"/api/messages/**").hasRole("ADMIN")
    .requestMatchers(HttpMethod.GET,"/api/**").permitAll()
    .requestMatchers("/api/**").hasRole("ADMIN")
    .anyRequest().permitAll())
   .formLogin(form->form.loginProcessingUrl("/api/auth/login")
    .successHandler((request,response,authentication)->{attempts.success(request.getRemoteAddr());response.setStatus(200);response.setContentType("application/json");response.getWriter().write("{\"authenticated\":true,\"email\":\""+authentication.getName()+"\"}");})
    .failureHandler((request,response,exception)->{attempts.failure(request.getRemoteAddr());response.setStatus(401);response.setContentType("application/json");response.getWriter().write("{\"message\":\"E-posta veya parola hatalı.\"}");}))
   .logout(logout->logout.logoutUrl("/api/auth/logout").invalidateHttpSession(true).deleteCookies("JSESSIONID")
    .logoutSuccessHandler((request,response,authentication)->{response.setStatus(204);}))
   .exceptionHandling(errors->errors.authenticationEntryPoint((request,response,exception)->{response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);response.setContentType("application/json");response.getWriter().write("{\"message\":\"Bu işlem için yönetici girişi gerekli.\"}");}))
   .headers(headers->headers.frameOptions(frame->frame.sameOrigin()))
   .addFilterBefore(new LoginRateLimitFilter(attempts),UsernamePasswordAuthenticationFilter.class);
  return http.build();
 }
}
