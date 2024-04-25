package com.hirokiminami.grtc.demo.web.dto;

import jakarta.validation.constraints.NotBlank;

public record CompletionRequest(
        @NotBlank(message = "Prompt is required") String prompt) {
}
