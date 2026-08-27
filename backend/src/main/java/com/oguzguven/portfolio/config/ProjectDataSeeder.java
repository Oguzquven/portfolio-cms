package com.oguzguven.portfolio.config;

import com.oguzguven.portfolio.project.Project;
import com.oguzguven.portfolio.project.ProjectRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class ProjectDataSeeder {
    @Bean
    CommandLineRunner seedProjects(ProjectRepository repository) {
        return args -> {
            if (repository.count() > 0) return;

            repository.saveAll(List.of(
                    new Project(
                            "E-Commerce Platform", "Full-Stack Project",
                            List.of("React.js", "Java", "Spring Boot", "PostgreSQL"),
                            "A full-stack e-commerce application featuring product listing, cart and order management. The frontend was built with React.js, while Java, Spring Boot and PostgreSQL power the backend.",
                            "https://e-commerce-67v1mafav-oguzquvens-projects.vercel.app", "commerce", "", true, 1
                    ),
                    new Project(
                            "Twitter REST API", "Backend Project",
                            List.of("Java", "Spring Boot", "PostgreSQL", "REST API"),
                            "A Twitter-inspired REST API built with Java, Spring Boot and PostgreSQL, providing endpoints for user management, post creation and social interactions.",
                            "https://github.com/Oguzquven/FSWEB-s19-Challenge", "social", "", true, 2
                    ),
                    new Project(
                            "Portfolio Website & CMS", "Full-Stack Project",
                            List.of("React.js", "Java", "Spring Boot", "PostgreSQL", "REST API"),
                            "A responsive portfolio and content management system with a React frontend, Spring Boot REST API, PostgreSQL persistence, admin authentication, media uploads and editable site content.",
                            "/", "portfolio", "", true, 3
                    )
            ));
        };
    }
}
