package com.microservices.adminservice.client;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import com.microservices.adminservice.dto.ValidateTokenRequest;
import com.microservices.adminservice.dto.ValidateTokenResponse;

@Component
public class AuthServiceClient {

    private static final Logger log = LoggerFactory.getLogger(AuthServiceClient.class);

    private final RestTemplate restTemplate;

    public AuthServiceClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Value("${auth-service.url}")
    private String authServiceUrl;

    @Value("${auth-service.validate-endpoint}")
    private String validateEndpoint;

    public ValidateTokenResponse validateToken(String token) {
        try {
            String url = authServiceUrl + validateEndpoint;
            ValidateTokenRequest request = new ValidateTokenRequest(token);

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
            return new ValidateTokenResponse(false, null, "Failed to validate token: " + e.getMessage());
        }
    }
}
