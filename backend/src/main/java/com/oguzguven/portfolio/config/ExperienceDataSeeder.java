package com.oguzguven.portfolio.config;

import com.oguzguven.portfolio.experience.Experience;
import com.oguzguven.portfolio.experience.ExperienceRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.util.List;

@Configuration
public class ExperienceDataSeeder {
    @Bean CommandLineRunner seedExperiences(ExperienceRepository repository) {
        return args -> { if (repository.count() > 0) return; repository.saveAll(List.of(
            new Experience("Related Digital (Doğuş Teknoloji)", ".NET Backend Developer Intern", "2025-07", "2025-12",
                "Contributed to backend development with .NET and C# in an Agile/Scrum environment, developed RESTful APIs for Related Digital products, and participated in sprint planning and code reviews while following clean-code principles.",
                List.of(".NET", "C#", "REST APIs", "Agile/Scrum"), "dogus", true, 1),
            new Experience("Dividesoft", "Full Stack Developer Intern", "2025-03", "2025-06",
                "Contributed to CRM-based enterprise applications using .NET, C# and TypeScript; worked with the Serenity platform and helped develop dashboard and user-activity features.",
                List.of(".NET", "C#", "TypeScript", "Serenity"), "dividesoft", true, 2),
            new Experience("Flalingo", "Full-Stack Developer Intern", "2025-02", "2025-04",
                "Contributed to the end-to-end development of okusfokus.com with Laravel, PHP and Next.js, working across frontend and backend features and presenting the completed work to stakeholders.",
                List.of("Laravel", "PHP", "Next.js", "Full-Stack"), "flalingo", true, 3)
        )); };
    }
}
