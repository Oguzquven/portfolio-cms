package com.oguzguven.portfolio.auth;

import java.time.*;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class LoginAttemptService {
 private record Attempt(int failures, Instant blockedUntil) {}
 private final ConcurrentHashMap<String,Attempt> attempts=new ConcurrentHashMap<>();
 private final int maxAttempts; private final Duration lockDuration;
 public LoginAttemptService(@Value("${portfolio.auth.max-attempts:5}") int maxAttempts,@Value("${portfolio.auth.lock-minutes:15}") long lockMinutes){this.maxAttempts=maxAttempts;this.lockDuration=Duration.ofMinutes(lockMinutes);}
 public boolean isBlocked(String key){var attempt=attempts.get(key);if(attempt==null)return false;if(attempt.blockedUntil()!=null&&attempt.blockedUntil().isAfter(Instant.now()))return true;if(attempt.blockedUntil()!=null)attempts.remove(key);return false;}
 public void failure(String key){attempts.compute(key,(ignored,current)->{int failures=current==null?1:current.failures()+1;return new Attempt(failures,failures>=maxAttempts?Instant.now().plus(lockDuration):null);});}
 public void success(String key){attempts.remove(key);}
}
