package com.microservices.authservice.api;

public final class AuthRoutes {

    private AuthRoutes() {
        // Utility class
    }

    public static final String BASE = "/api/auth";

    public static final String REGISTER = "/register";
    public static final String LOGIN = "/login";
    public static final String VALIDATE = "/validate";
    public static final String HEALTH = "/health";
}
