package com.oguzguven.portfolio.about;
public record AboutResponse(String eyebrow,String titleLineOne,String titleLineTwo,String titleHighlight,String bioLabel,String firstParagraph,String secondParagraph,String ctaText,String ctaUrl) {
    static AboutResponse from(About about) { return new AboutResponse(about.getEyebrow(),about.getTitleLineOne(),about.getTitleLineTwo(),about.getTitleHighlight(),about.getBioLabel(),about.getFirstParagraph(),about.getSecondParagraph(),about.getCtaText(),about.getCtaUrl()); }
}
