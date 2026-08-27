package com.oguzguven.portfolio;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import jakarta.servlet.http.HttpSession;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.*;

@SpringBootTest
@AutoConfigureMockMvc
class AuthSecurityIntegrationTests {
 @Autowired MockMvc mockMvc;

 @Test void publicContentCanBeReadWithoutLogin() throws Exception {
  mockMvc.perform(get("/api/projects")).andExpect(status().isOk());
  mockMvc.perform(get("/api/hero")).andExpect(status().isOk());
 }

 @Test void anonymousUserCannotChangeContent() throws Exception {
  mockMvc.perform(put("/api/settings").contentType(MediaType.APPLICATION_JSON).content("{}"))
   .andExpect(status().isUnauthorized())
   .andExpect(jsonPath("$.message").value("Bu işlem için yönetici girişi gerekli."));
 }

 @Test void validCredentialsCreateAuthenticatedSession() throws Exception {
  MvcResult login=mockMvc.perform(post("/api/auth/login")
    .contentType(MediaType.APPLICATION_FORM_URLENCODED)
    .param("username","admin@portfolio.dev").param("password","Admin123!"))
   .andExpect(status().isOk()).andExpect(jsonPath("$.authenticated").value(true)).andReturn();
  HttpSession session=login.getRequest().getSession(false);
  Assertions.assertNotNull(session);
  mockMvc.perform(get("/api/auth/me").session((org.springframework.mock.web.MockHttpSession)session))
   .andExpect(status().isOk()).andExpect(jsonPath("$.authenticated").value(true))
   .andExpect(jsonPath("$.email").value("admin@portfolio.dev"));
 }

 @Test void invalidCredentialsAreRejected() throws Exception {
  mockMvc.perform(post("/api/auth/login").contentType(MediaType.APPLICATION_FORM_URLENCODED)
    .param("username","admin@portfolio.dev").param("password","wrong-password"))
   .andExpect(status().isUnauthorized()).andExpect(jsonPath("$.message").value("E-posta veya parola hatalı."));
 }

 @Test void adminCanChangeSettings() throws Exception {
  String body="""
   {"siteName":"Oğuz Güven","role":"Full-Stack Developer","browserTitle":"Test Title","metaDescription":"Test description","siteLanguage":"tr","displayYear":"2026","projectsYear":"2026","technologyYear":"2026","cvUrl":"","cvFileName":""}
   """;
  mockMvc.perform(put("/api/settings").with(user("admin@portfolio.dev").roles("ADMIN"))
    .contentType(MediaType.APPLICATION_JSON).content(body))
   .andExpect(status().isOk()).andExpect(jsonPath("$.browserTitle").value("Test Title"));
 }

 @Test void contactMessagesCanBeSentPubliclyButOnlyReadByAdmin() throws Exception {
  String body="""
   {"name":"Test User","email":"test@example.com","message":"Portfolio message test"}
   """;
  MvcResult created=mockMvc.perform(post("/api/messages").contentType(MediaType.APPLICATION_JSON).content(body))
   .andExpect(status().isCreated()).andExpect(jsonPath("$.read").value(false)).andReturn();
  String id=com.jayway.jsonpath.JsonPath.read(created.getResponse().getContentAsString(), "$.id");

  mockMvc.perform(get("/api/messages")).andExpect(status().isUnauthorized());
  mockMvc.perform(get("/api/messages").with(user("admin@portfolio.dev").roles("ADMIN")))
   .andExpect(status().isOk()).andExpect(jsonPath("$[0].email").value("test@example.com"));
  mockMvc.perform(patch("/api/messages/{id}/read",id).with(user("admin@portfolio.dev").roles("ADMIN")))
   .andExpect(status().isOk()).andExpect(jsonPath("$.read").value(true));
  mockMvc.perform(delete("/api/messages/{id}",id).with(user("admin@portfolio.dev").roles("ADMIN")))
   .andExpect(status().isNoContent());
 }
}
