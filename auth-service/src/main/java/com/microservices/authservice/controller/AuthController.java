package com.microservices.authservice.controller;

import com.microservices.authservice.api.AuthRoutes;
import com.microservices.authservice.dto.*;
import com.microservices.authservice.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(AuthRoutes.BASE)
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping(AuthRoutes.REGISTER)
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return ResponseEntity.status(201).body(response);
    }

    @PostMapping(AuthRoutes.LOGIN)
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping(AuthRoutes.VALIDATE)
    public ResponseEntity<ValidateTokenResponse> validateToken(@Valid @RequestBody ValidateTokenRequest request) {
        try {
            String username = authService.extractUsername(request.getToken());
            boolean isValid = authService.validateToken(request.getToken(), username);
            
            return ResponseEntity.ok(ValidateTokenResponse.builder()
                    .valid(isValid)
                    .username(username)
                    .message(isValid ? "Token is valid" : "Token is invalid")
                    .build());
        } catch (Exception e) {
            return ResponseEntity.ok(ValidateTokenResponse.builder()
                    .valid(false)
                    .message("Token validation failed: " + e.getMessage())
                    .build());
        }
    }

    @GetMapping(AuthRoutes.HEALTH)
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Auth Service is running");
    }
}
