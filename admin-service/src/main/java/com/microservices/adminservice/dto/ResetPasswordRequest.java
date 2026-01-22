package com.microservices.adminservice.dto;

import jakarta.validation.constraints.NotBlank;
public class ResetPasswordRequest {
    
    @NotBlank(message = "New password is required")
    private String newPassword;

    public ResetPasswordRequest() {
    }

    public ResetPasswordRequest(String newPassword) {
        this.newPassword = newPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
