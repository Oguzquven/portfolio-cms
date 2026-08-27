package com.oguzguven.portfolio.about;

import jakarta.persistence.*;

@Entity
@Table(name = "about_content")
public class About {
    @Id private Long id = 1L;
    @Column(nullable = false, length = 80) private String eyebrow;
    @Column(name = "title_line_one", nullable = false, length = 180) private String titleLineOne;
    @Column(name = "title_line_two", nullable = false, length = 180) private String titleLineTwo;
    @Column(name = "title_highlight", nullable = false, length = 180) private String titleHighlight;
    @Column(name = "bio_label", nullable = false, length = 100) private String bioLabel;
    @Column(name = "first_paragraph", nullable = false, length = 1500) private String firstParagraph;
    @Column(name = "second_paragraph", nullable = false, length = 1500) private String secondParagraph;
    @Column(name = "cta_text", nullable = false, length = 80) private String ctaText;
    @Column(name = "cta_url", nullable = false, length = 300) private String ctaUrl;

    protected About() {}
    public About(AboutRequest request) { update(request); }
    public void update(AboutRequest request) {
        eyebrow = request.eyebrow(); titleLineOne = request.titleLineOne();
        titleLineTwo = request.titleLineTwo(); titleHighlight = request.titleHighlight();
        bioLabel = request.bioLabel(); firstParagraph = request.firstParagraph();
        secondParagraph = request.secondParagraph(); ctaText = request.ctaText(); ctaUrl = request.ctaUrl();
    }
    public String getEyebrow(){return eyebrow;} public String getTitleLineOne(){return titleLineOne;}
    public String getTitleLineTwo(){return titleLineTwo;} public String getTitleHighlight(){return titleHighlight;}
    public String getBioLabel(){return bioLabel;} public String getFirstParagraph(){return firstParagraph;}
    public String getSecondParagraph(){return secondParagraph;} public String getCtaText(){return ctaText;}
    public String getCtaUrl(){return ctaUrl;}
}
