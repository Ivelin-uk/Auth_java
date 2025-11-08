package com.microservices.authservice.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.regex.Pattern;

public class PasswordValidator implements ConstraintValidator<ValidPassword, String> {

    private static final int MIN_LENGTH = 8;
    private static final int MAX_LENGTH = 100;
    
    // Регулярни изрази за различните изисквания
    private static final Pattern UPPERCASE_PATTERN = Pattern.compile("[A-Z]");
    private static final Pattern LOWERCASE_PATTERN = Pattern.compile("[a-z]");
    private static final Pattern DIGIT_PATTERN = Pattern.compile("[0-9]");
    private static final Pattern SPECIAL_CHAR_PATTERN = Pattern.compile("[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?]");

    @Override
    public void initialize(ValidPassword constraintAnnotation) {
    }

    @Override
    public boolean isValid(String password, ConstraintValidatorContext context) {
        if (password == null || password.isBlank()) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("Password cannot be empty")
                    .addConstraintViolation();
            return false;
        }

        // Проверка на дължина
        if (password.length() < MIN_LENGTH) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(
                    String.format("Password must be at least %d characters long", MIN_LENGTH))
                    .addConstraintViolation();
            return false;
        }

        if (password.length() > MAX_LENGTH) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(
                    String.format("Password must not exceed %d characters", MAX_LENGTH))
                    .addConstraintViolation();
            return false;
        }

        // Проверка за главна буква
        if (!UPPERCASE_PATTERN.matcher(password).find()) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(
                    "Password must contain at least one uppercase letter")
                    .addConstraintViolation();
            return false;
        }

        // Проверка за малка буква
        if (!LOWERCASE_PATTERN.matcher(password).find()) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(
                    "Password must contain at least one lowercase letter")
                    .addConstraintViolation();
            return false;
        }

        // Проверка за цифра
        if (!DIGIT_PATTERN.matcher(password).find()) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(
                    "Password must contain at least one digit")
                    .addConstraintViolation();
            return false;
        }

        // Проверка за специален символ
        if (!SPECIAL_CHAR_PATTERN.matcher(password).find()) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(
                    "Password must contain at least one special character (!@#$%^&*()_+-=[]{}etc.)")
                    .addConstraintViolation();
            return false;
        }

        return true;
    }
}
