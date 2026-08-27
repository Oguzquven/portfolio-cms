package com.oguzguven.portfolio.media;
import org.springframework.http.HttpStatus;import org.springframework.web.bind.annotation.*;import org.springframework.web.multipart.MultipartFile;
@RestController @RequestMapping("/api/media") public class MediaController {private final MediaStorageService storage;public MediaController(MediaStorageService storage){this.storage=storage;}@PostMapping @ResponseStatus(HttpStatus.CREATED) public MediaResponse upload(@RequestPart("file")MultipartFile file){return storage.store(file);}}
