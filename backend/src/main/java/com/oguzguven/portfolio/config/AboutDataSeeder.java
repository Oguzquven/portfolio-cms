package com.oguzguven.portfolio.config;
import com.oguzguven.portfolio.about.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.*;
@Configuration public class AboutDataSeeder {
    @Bean CommandLineRunner seedAbout(AboutRepository repository){return args->{if(repository.count()==0) repository.save(new About(new AboutRequest("ABOUT","I work across the stack,","but feel most at home","behind the interface.","A LITTLE ABOUT ME","I'm Oğuz, a Full-Stack Developer and Computer Engineering graduate based in Istanbul. I have hands-on experience with Java, Spring Boot, .NET/C#, React and PostgreSQL.","Through internships at Related Digital (Doğuş Teknoloji), Dividesoft and Flalingo, I worked on REST APIs and full-stack applications. I'm particularly interested in backend development and building reliable, scalable software solutions.","LET'S WORK TOGETHER","#contact")));};}
}
