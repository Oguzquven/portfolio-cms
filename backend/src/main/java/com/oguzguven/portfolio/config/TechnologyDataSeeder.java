package com.oguzguven.portfolio.config;
import com.oguzguven.portfolio.technology.*;import org.springframework.boot.CommandLineRunner;import org.springframework.context.annotation.*;import java.util.*;
@Configuration public class TechnologyDataSeeder{
 @Bean CommandLineRunner seedTechnologies(TechnologyRepository repository){return args->{if(repository.count()>0)return;String[][] values={{"Java","openjdk"},{"Spring Boot","springboot"},{".NET / C#","dotnet"},{"React.js","react"},{"JavaScript","javascript"},{"TypeScript","typescript"},{"Next.js","nextdotjs"},{"PostgreSQL","postgresql"},{"REST APIs","openapiinitiative"},{"Git / GitHub","github"},{"Docker","docker"}};List<Technology> items=new ArrayList<>();for(int i=0;i<values.length;i++)items.add(new Technology(values[i][0],values[i][1],"","#ffffff",true,i+1));repository.saveAll(items);};}
}
