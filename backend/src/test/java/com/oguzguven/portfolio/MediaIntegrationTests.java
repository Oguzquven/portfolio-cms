package com.oguzguven.portfolio;

import static org.hamcrest.Matchers.startsWith;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.jayway.jsonpath.JsonPath;
import java.nio.file.Files;
import java.nio.file.Path;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

@SpringBootTest
@AutoConfigureMockMvc
class MediaIntegrationTests {
 @Autowired MockMvc mockMvc;
 @Value("${portfolio.media.upload-dir}") String uploadDirectory;
 private Path uploadedFile;

 @AfterEach void cleanUploadedFile() throws Exception {
  if(uploadedFile!=null) Files.deleteIfExists(uploadedFile);
 }

 @Test void anonymousUserCannotUploadMedia() throws Exception {
  MockMultipartFile file=new MockMultipartFile("file","cover.png","image/png",new byte[]{1,2,3});
  mockMvc.perform(multipart("/api/media").file(file)).andExpect(status().isUnauthorized());
 }

 @Test void adminCanUploadMediaAndFileIsPubliclyReadable() throws Exception {
  byte[] bytes=new byte[]{(byte)0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a};
  MockMultipartFile file=new MockMultipartFile("file","cover.png","image/png",bytes);
  MvcResult result=mockMvc.perform(multipart("/api/media").file(file)
    .with(user("admin@portfolio.dev").roles("ADMIN")))
   .andExpect(status().isCreated())
   .andExpect(jsonPath("$.url",startsWith("/uploads/")))
   .andExpect(jsonPath("$.originalName").value("cover.png"))
   .andReturn();
  String url=JsonPath.read(result.getResponse().getContentAsString(),"$.url");
  uploadedFile=Path.of(uploadDirectory).toAbsolutePath().normalize().resolve(url.substring("/uploads/".length()));
  mockMvc.perform(get(url)).andExpect(status().isOk()).andExpect(content().contentType("image/png"))
   .andExpect(content().bytes(bytes));
 }

 @Test void unsupportedMediaTypeIsRejected() throws Exception {
  MockMultipartFile file=new MockMultipartFile("file","payload.exe","application/octet-stream",new byte[]{1});
  mockMvc.perform(multipart("/api/media").file(file).with(user("admin@portfolio.dev").roles("ADMIN")))
   .andExpect(status().isBadRequest())
   .andExpect(jsonPath("$.message").value("Yalnızca PNG, JPG, WEBP veya SVG yüklenebilir."));
 }
}
