package com.microservices.authservice.service;

import com.microservices.authservice.dto.LoginRequest;
import com.microservices.authservice.dto.RegisterRequest;
import com.microservices.authservice.dto.AuthResponse;
import com.microservices.authservice.entity.Role;
import com.microservices.authservice.entity.User;
import com.microservices.authservice.exception.BadRequestException;
import com.microservices.authservice.exception.NotFoundException;
import com.microservices.authservice.repository.UserRepository;
import com.microservices.authservice.security.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            AuthenticationManager authenticationManager
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public AuthResponse register(RegisterRequest request) {
        // Check if username already exists
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new BadRequestException("Username already exists");
        }

        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already exists");
        }

        // Create new user
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER);
        user.setEnabled(true);

        userRepository.save(user);

        var jwtToken = jwtService.generateToken(user);

        return new AuthResponse(
            jwtToken,
            user.getUsername(),
            user.getEmail(),
            "User registered successfully"
        );
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        var user = userRepository.findByUsername(request.getUsername())
            .orElseThrow(() -> new NotFoundException("User not found"));

        var jwtToken = jwtService.generateToken(user);

        return new AuthResponse(
            jwtToken,
            user.getUsername(),
            user.getEmail(),
            "Login successful"
        );
    }

    public boolean validateToken(String token, String username) {
        var user = userRepository.findByUsername(username)
                .orElseThrow(() -> new NotFoundException("User not found"));
        return jwtService.isTokenValid(token, user);
    }

    public String extractUsername(String token) {
        return jwtService.extractUsername(token);
    }
}
