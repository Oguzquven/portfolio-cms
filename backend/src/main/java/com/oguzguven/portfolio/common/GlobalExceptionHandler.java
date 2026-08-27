package com.oguzguven.portfolio.common;

import com.oguzguven.portfolio.project.ProjectNotFoundException;
import com.oguzguven.portfolio.experience.ExperienceNotFoundException;
import com.oguzguven.portfolio.technology.TechnologyNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.NoSuchElementException;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiError handleBadRequest(IllegalArgumentException exception) {
        return new ApiError(Instant.now(), 400, exception.getMessage(), Map.of());
    }
    @ExceptionHandler({ProjectNotFoundException.class, ExperienceNotFoundException.class, TechnologyNotFoundException.class, NoSuchElementException.class})
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ApiError handleNotFound(RuntimeException exception) {
        return new ApiError(Instant.now(), 404, exception.getMessage(), Map.of());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiError handleValidation(MethodArgumentNotValidException exception) {
        Map<String, String> errors = new LinkedHashMap<>();
        exception.getBindingResult().getFieldErrors().forEach(error ->
                errors.putIfAbsent(error.getField(), error.getDefaultMessage()));
        return new ApiError(Instant.now(), 400, "Validation failed", errors);
    }
}
