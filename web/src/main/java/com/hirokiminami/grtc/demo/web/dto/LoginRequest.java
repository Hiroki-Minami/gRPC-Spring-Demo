package com.hirokiminami.grtc.demo.web.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record LoginRequest(
        @Email(message = "Invalid email format") @NotBlank(message = "Email is required") String email,
        @NotBlank(message = "Password is required") @Size(min = 8, message = "Password length must be equal or larger than 8") String password) {
}
