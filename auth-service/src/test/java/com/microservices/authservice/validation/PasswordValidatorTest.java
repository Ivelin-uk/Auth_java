package com.microservices.authservice.validation;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class PasswordValidatorTest {

    private Validator validator;

    @BeforeEach
    void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    static class TestObject {
        @ValidPassword
        private String password;

        public TestObject(String password) {
            this.password = password;
        }
    }

    @Test
    void testValidPassword() {
        TestObject obj = new TestObject("Password123!");
        Set<ConstraintViolation<TestObject>> violations = validator.validate(obj);
        assertTrue(violations.isEmpty(), "Valid password should pass validation");
    }

    @Test
    void testPasswordTooShort() {
        TestObject obj = new TestObject("Pass1!");
        Set<ConstraintViolation<TestObject>> violations = validator.validate(obj);
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getMessage().contains("at least 8 characters")));
    }

    @Test
    void testPasswordWithoutUppercase() {
        TestObject obj = new TestObject("password123!");
        Set<ConstraintViolation<TestObject>> violations = validator.validate(obj);
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getMessage().contains("uppercase letter")));
    }

    @Test
    void testPasswordWithoutLowercase() {
        TestObject obj = new TestObject("PASSWORD123!");
        Set<ConstraintViolation<TestObject>> violations = validator.validate(obj);
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getMessage().contains("lowercase letter")));
    }

    @Test
    void testPasswordWithoutDigit() {
        TestObject obj = new TestObject("Password!");
        Set<ConstraintViolation<TestObject>> violations = validator.validate(obj);
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getMessage().contains("digit")));
    }

    @Test
    void testPasswordWithoutSpecialCharacter() {
        TestObject obj = new TestObject("Password123");
        Set<ConstraintViolation<TestObject>> violations = validator.validate(obj);
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getMessage().contains("special character")));
    }

    @Test
    void testNullPassword() {
        TestObject obj = new TestObject(null);
        Set<ConstraintViolation<TestObject>> violations = validator.validate(obj);
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getMessage().contains("empty")));
    }

    @Test
    void testEmptyPassword() {
        TestObject obj = new TestObject("");
        Set<ConstraintViolation<TestObject>> violations = validator.validate(obj);
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getMessage().contains("empty")));
    }

    @Test
    void testPasswordTooLong() {
        String longPassword = "A".repeat(101) + "a1!";
        TestObject obj = new TestObject(longPassword);
        Set<ConstraintViolation<TestObject>> violations = validator.validate(obj);
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getMessage().contains("must not exceed")));
    }
}
