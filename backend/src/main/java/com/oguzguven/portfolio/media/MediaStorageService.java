package com.oguzguven.portfolio.media;
import org.springframework.beans.factory.annotation.Value;import org.springframework.stereotype.Service;import org.springframework.web.multipart.MultipartFile;import java.io.IOException;import java.nio.file.*;import java.util.*;
@Service public class MediaStorageService {
 private static final Set<String> ALLOWED=Set.of("image/png","image/jpeg","image/webp","image/svg+xml");
 private static final Map<String,String> EXT=Map.of("image/png",".png","image/jpeg",".jpg","image/webp",".webp","image/svg+xml",".svg");
 private final Path root;
 public MediaStorageService(@Value("${portfolio.media.upload-dir}")String dir){root=Paths.get(dir).toAbsolutePath().normalize();try{Files.createDirectories(root);}catch(IOException e){throw new IllegalStateException("Yükleme klasörü oluşturulamadı.",e);}}
 public MediaResponse store(MultipartFile file){if(file==null||file.isEmpty())throw new IllegalArgumentException("Yüklenecek dosya boş olamaz.");String type=Optional.ofNullable(file.getContentType()).orElse("").toLowerCase(Locale.ROOT);if(!ALLOWED.contains(type))throw new IllegalArgumentException("Yalnızca PNG, JPG, WEBP veya SVG yüklenebilir.");String name=UUID.randomUUID()+EXT.get(type);Path target=root.resolve(name).normalize();if(!target.getParent().equals(root))throw new IllegalArgumentException("Geçersiz dosya yolu.");try{Files.createDirectories(root);Files.copy(file.getInputStream(),target,StandardCopyOption.REPLACE_EXISTING);}catch(IOException e){throw new IllegalStateException("Dosya kaydedilemedi.",e);}return new MediaResponse("/uploads/"+name,file.getOriginalFilename(),type,file.getSize());}
 public Path root(){return root;}
}
