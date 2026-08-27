package com.oguzguven.portfolio.technology;
import jakarta.persistence.*;
import java.util.UUID;

@Entity @Table(name="technologies")
public class Technology {
 @Id @GeneratedValue private UUID id;
 @Column(nullable=false,length=80) private String name;
 @Column(nullable=false,length=100) private String slug;
 @Column(name="icon_url",length=10_000_000) private String iconUrl;
 @Column(length=20) private String color;
 @Column(nullable=false) private boolean published;
 @Column(name="display_order",nullable=false) private int displayOrder;
 protected Technology() {}
 public Technology(String name,String slug,String iconUrl,String color,boolean published,int displayOrder){update(name,slug,iconUrl,color,published,displayOrder);}
 public void update(String name,String slug,String iconUrl,String color,boolean published,int displayOrder){this.name=name;this.slug=slug;this.iconUrl=iconUrl;this.color=color;this.published=published;this.displayOrder=displayOrder;}
 public void toggle(){published=!published;}
 public UUID getId(){return id;} public String getName(){return name;} public String getSlug(){return slug;}
 public String getIconUrl(){return iconUrl;} public String getColor(){return color;} public boolean isPublished(){return published;} public int getDisplayOrder(){return displayOrder;}
}
