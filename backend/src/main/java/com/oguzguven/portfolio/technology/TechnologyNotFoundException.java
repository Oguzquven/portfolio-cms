package com.oguzguven.portfolio.technology;
import java.util.UUID;
public class TechnologyNotFoundException extends RuntimeException{public TechnologyNotFoundException(UUID id){super("Technology not found: "+id);}}
