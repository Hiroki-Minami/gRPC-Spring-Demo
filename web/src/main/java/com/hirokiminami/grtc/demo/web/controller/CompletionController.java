package com.hirokiminami.grtc.demo.web.controller;

import com.hirokiminami.grtc.demo.web.dto.CompletionRequest;
import com.hirokiminami.grtc.demo.web.dto.CompletionResponse;
import com.hirokiminami.grtc.demo.web.service.CompletionService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/completion")
public class CompletionController {

    private final CompletionService completionService;
    public CompletionController(CompletionService completionService) {
        this.completionService = completionService;
    }
    @PostMapping
    public ResponseEntity<CompletionResponse> completion(@Valid @RequestBody CompletionRequest request) {
        String result = completionService.getCompletion(request.prompt());
        CompletionResponse completionResponse = new CompletionResponse(result);
        return ResponseEntity.ok(completionResponse);
    }
}
