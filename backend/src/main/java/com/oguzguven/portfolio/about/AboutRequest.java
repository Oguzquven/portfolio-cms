package com.oguzguven.portfolio.about;
import jakarta.validation.constraints.*;
public record AboutRequest(@NotBlank String eyebrow,@NotBlank String titleLineOne,@NotBlank String titleLineTwo,@NotBlank String titleHighlight,@NotBlank String bioLabel,@NotBlank @Size(max=1500) String firstParagraph,@NotBlank @Size(max=1500) String secondParagraph,@NotBlank String ctaText,@NotBlank String ctaUrl) {}
