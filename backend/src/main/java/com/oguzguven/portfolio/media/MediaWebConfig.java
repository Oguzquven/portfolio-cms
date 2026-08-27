package com.oguzguven.portfolio.media;
import org.springframework.context.annotation.Configuration;import org.springframework.web.servlet.config.annotation.*;
@Configuration public class MediaWebConfig implements WebMvcConfigurer {private final MediaStorageService storage;public MediaWebConfig(MediaStorageService storage){this.storage=storage;}@Override public void addResourceHandlers(ResourceHandlerRegistry registry){registry.addResourceHandler("/uploads/**").addResourceLocations(storage.root().toUri().toString()).setCachePeriod(31536000);}}
