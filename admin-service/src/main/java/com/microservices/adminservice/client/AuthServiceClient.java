package com.microservices.adminservice.client;

import com.microservices.adminservice.dto.ValidateTokenRequest;
import com.microservices.adminservice.dto.ValidateTokenResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.RestClientException;

@Slf4j
@Component
@RequiredArgsConstructor
public class AuthServiceClient {

    private final RestTemplate restTemplate;

    @Value("${auth-service.url}")
    private String authServiceUrl;

    @Value("${auth-service.validate-endpoint}")
    private String validateEndpoint;

    public ValidateTokenResponse validateToken(String token) {
        try {
            String url = authServiceUrl + validateEndpoint;
            ValidateTokenRequest request = ValidateTokenRequest.builder()
                    .token(token)
                    .build();

            log.debug("Validating token with Auth Service at: {}", url);
            
            ValidateTokenResponse response = restTemplate.postForObject(
                    url,
                    request,
                    ValidateTokenResponse.class
            );

            log.debug("Token validation response: {}", response);
            return response;
            
        } catch (RestClientException e) {
            log.error("Error communicating with Auth Service", e);
            return ValidateTokenResponse.builder()
                    .valid(false)
                    .message("Failed to validate token: " + e.getMessage())
                    .build();
        }
    }
}
