package com.ubb.auth.service;

import com.ubb.auth.exception.AuthException;
import com.ubb.auth.exception.EntityNotFoundException;
import com.ubb.auth.model.User;

import com.ubb.auth.repository.UserRepository;
import com.ubb.auth.service.audit.AuditLogPublisher;
import com.ubb.modernstore.openapi.model.AuditLogDto;
import com.ubb.modernstore.openapi.model.LoginResponseDto;
import com.ubb.modernstore.openapi.model.RegisterRequestDto;
import com.ubb.modernstore.openapi.model.LoginRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository repository;
    private final PasswordEncoder encoder;
    private final JwtService jwtService;
    private final AuditLogPublisher auditPublisher;

    public void register(RegisterRequestDto registerRequestDto) {
        var user = User.builder()
                .email(registerRequestDto.getEmail())
                .username(registerRequestDto.getUsername())
                .password(encoder.encode(registerRequestDto.getPassword()))
                .roles(List.of("USER"))
                .build();

        var savedUser = repository.save(user);
        publishAuditLog("USER_REGISTERED", savedUser.getId(), savedUser.getId());
    }

    public LoginResponseDto login(LoginRequestDto loginRequestDto) {
        var user = repository.findByEmail(loginRequestDto.getEmail())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        if (!encoder.matches(loginRequestDto.getPassword(), user.getPassword())) {
            throw new AuthException("Invalid credentials");
        }

        var response = new LoginResponseDto();
        response.setToken(jwtService.generateToken(user));

        return response;
    }

    private void publishAuditLog(String eventType, String userId, String entityId) {
        var auditLog = new AuditLogDto();
        auditLog.setEventType(eventType);
        auditLog.setEntityType("User");
        auditLog.setTimestamp(Instant.now().toString());
        auditLog.setUserId(userId);
        auditLog.setEntityId(entityId);

        auditPublisher.publish(auditLog);
    }

}
