package com.oguzguven.portfolio.hero;
import jakarta.persistence.*;

@Entity @Table(name="hero_content")
public class Hero {
 @Id private Long id=1L;
 @Column(nullable=false,length=80) private String eyebrow;
 @Column(name="title_prefix",nullable=false,length=150) private String titlePrefix;
 @Column(name="title_highlight",nullable=false,length=80) private String titleHighlight;
 @Column(name="title_suffix",nullable=false,length=150) private String titleSuffix;
 @Column(nullable=false,length=1000) private String description;
 @Column(name="primary_text",nullable=false,length=60) private String primaryText;
 @Column(name="primary_url",nullable=false,length=300) private String primaryUrl;
 @Column(name="secondary_text",nullable=false,length=60) private String secondaryText;
 @Column(name="secondary_url",nullable=false,length=300) private String secondaryUrl;
 @Column(nullable=false,length=100) private String location;
 @Column(name="availability_label",nullable=false,length=80) private String availabilityLabel;
 @Column(name="availability_text",nullable=false,length=120) private String availabilityText;
 @Column(name="photo_url",length=10_000_000) private String photoUrl;
 @Column(name="stat1_value",length=60) private String stat1Value; @Column(name="stat1_label",length=80) private String stat1Label;
 @Column(name="stat2_value",length=60) private String stat2Value; @Column(name="stat2_label",length=80) private String stat2Label;
 @Column(name="stat3_value",length=60) private String stat3Value; @Column(name="stat3_label",length=80) private String stat3Label;
 @Column(name="stat4_value",length=60) private String stat4Value; @Column(name="stat4_label",length=80) private String stat4Label;
 protected Hero(){}
 public Hero(HeroRequest r){update(r);}
 public void update(HeroRequest r){eyebrow=r.eyebrow();titlePrefix=r.titlePrefix();titleHighlight=r.titleHighlight();titleSuffix=r.titleSuffix();description=r.description();primaryText=r.primaryText();primaryUrl=r.primaryUrl();secondaryText=r.secondaryText();secondaryUrl=r.secondaryUrl();location=r.location();availabilityLabel=r.availabilityLabel();availabilityText=r.availabilityText();photoUrl=r.photoUrl();stat1Value=r.stat1Value();stat1Label=r.stat1Label();stat2Value=r.stat2Value();stat2Label=r.stat2Label();stat3Value=r.stat3Value();stat3Label=r.stat3Label();stat4Value=r.stat4Value();stat4Label=r.stat4Label();}
 public Long getId(){return id;} public String getEyebrow(){return eyebrow;} public String getTitlePrefix(){return titlePrefix;} public String getTitleHighlight(){return titleHighlight;} public String getTitleSuffix(){return titleSuffix;} public String getDescription(){return description;} public String getPrimaryText(){return primaryText;} public String getPrimaryUrl(){return primaryUrl;} public String getSecondaryText(){return secondaryText;} public String getSecondaryUrl(){return secondaryUrl;} public String getLocation(){return location;} public String getAvailabilityLabel(){return availabilityLabel;} public String getAvailabilityText(){return availabilityText;} public String getPhotoUrl(){return photoUrl;} public String getStat1Value(){return stat1Value;} public String getStat1Label(){return stat1Label;} public String getStat2Value(){return stat2Value;} public String getStat2Label(){return stat2Label;} public String getStat3Value(){return stat3Value;} public String getStat3Label(){return stat3Label;} public String getStat4Value(){return stat4Value;} public String getStat4Label(){return stat4Label;}
}
