package com.ubb.auth.controller;

import com.ubb.auth.service.AuthService;
import com.ubb.modernstore.openapi.controller.AuthApi;
import com.ubb.modernstore.openapi.model.LoginRequestDto;
import com.ubb.modernstore.openapi.model.RegisterRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AuthController implements AuthApi {

    private final AuthService service;

    @Override
    public ResponseEntity<String> loginUser(LoginRequestDto loginRequestDto) {
        return ResponseEntity.ok(service.login(loginRequestDto));
    }

    @Override
    public ResponseEntity<Void> registerUser(RegisterRequestDto registerRequestDto) {
        service.register(registerRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

}
