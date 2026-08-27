package com.oguzguven.portfolio.technology;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;
public interface TechnologyRepository extends JpaRepository<Technology,UUID>{List<Technology> findAllByOrderByDisplayOrderAsc();List<Technology> findByPublishedTrueOrderByDisplayOrderAsc();}
