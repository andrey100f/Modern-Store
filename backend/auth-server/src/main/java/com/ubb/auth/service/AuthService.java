package com.ubb.auth.service;

import com.ubb.auth.exception.AuthException;
import com.ubb.auth.exception.EntityNotFoundException;
import com.ubb.auth.model.User;

import com.ubb.auth.repository.UserRepository;
import com.ubb.modernstore.openapi.model.LoginResponseDto;
import com.ubb.modernstore.openapi.model.RegisterRequestDto;
import com.ubb.modernstore.openapi.model.LoginRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository repository;
    private final PasswordEncoder encoder;
    private final JwtService jwtService;

    public void register(RegisterRequestDto registerRequestDto) {
        var user = User.builder()
                .email(registerRequestDto.getEmail())
                .username(registerRequestDto.getUsername())
                .password(encoder.encode(registerRequestDto.getPassword()))
                .roles(List.of("USER"))
                .build();

        repository.save(user);
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

}
