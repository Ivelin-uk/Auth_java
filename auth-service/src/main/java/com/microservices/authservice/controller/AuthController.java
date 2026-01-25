package com.microservices.authservice.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.microservices.authservice.api.AuthRoutes;
import com.microservices.authservice.dto.AuthResponse;
import com.microservices.authservice.dto.LoginRequest;
import com.microservices.authservice.dto.RegisterRequest;
import com.microservices.authservice.dto.ValidateTokenRequest;
import com.microservices.authservice.dto.ValidateTokenResponse;
import com.microservices.authservice.service.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping(AuthRoutes.BASE)
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

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
        String token = request.getToken();
        String username = authService.extractUsername(token);

        boolean isValid = username != null && authService.validateToken(token, username);

        return ResponseEntity.ok(new ValidateTokenResponse(
                isValid,
                isValid ? username : null,
                isValid ? "Token is valid" : "Token is invalid"
        ));
    }

    @GetMapping(AuthRoutes.HEALTH)
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Auth Service is running");
    }

    public AuthService getAuthService() {
        return authService;
    }
}
