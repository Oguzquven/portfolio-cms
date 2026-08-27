package com.oguzguven.portfolio.technology;
import java.util.UUID;
public record TechnologyResponse(UUID id,String name,String slug,String iconUrl,String color,boolean published,int displayOrder){
 static TechnologyResponse from(Technology t){return new TechnologyResponse(t.getId(),t.getName(),t.getSlug(),t.getIconUrl(),t.getColor(),t.isPublished(),t.getDisplayOrder());}
}
