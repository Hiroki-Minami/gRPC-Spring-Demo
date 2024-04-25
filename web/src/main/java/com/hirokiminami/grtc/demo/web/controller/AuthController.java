package com.hirokiminami.grtc.demo.web.controller;

import com.hirokiminami.grtc.demo.web.constant.LoginResponseStatus;
import com.hirokiminami.grtc.demo.web.dto.LoginRequest;
import com.hirokiminami.grtc.demo.web.dto.LoginResponse;
import com.hirokiminami.grtc.demo.web.dto.RegisterRequest;
import com.hirokiminami.grtc.demo.web.dto.RegisterResponse;
import com.hirokiminami.grtc.demo.web.model.User;
import com.hirokiminami.grtc.demo.web.repository.UserRepository;
import com.hirokiminami.grtc.demo.web.service.TokenService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthController {

    private final TokenService tokenService;
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(TokenService tokenService, AuthenticationManager authenticationManager, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.tokenService = tokenService;
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        // TODO: auth
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.email(), loginRequest.password()));
        String token =  tokenService.generateToken(authentication);

        LoginResponse response = new LoginResponse(LoginResponseStatus.OK.toString(), token);
        // TODO: Create JWT token
        // TODO: Return it
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(@Valid @RequestBody RegisterRequest registerRequest) {
        User user = userRepository.findByEmail(registerRequest.email()).orElse(null);

        if (user != null) {
            RegisterResponse errorResponse = new RegisterResponse(LoginResponseStatus.ALREADY_EXIST.toString());
            return ResponseEntity.ok(errorResponse);
        }

        User newUser = new User();
        newUser.setEmail(registerRequest.email());
        newUser.setPassword(passwordEncoder.encode(registerRequest.password()));
        // TODO: create verification token
        // TODO: set

        // TODO: email

        User createdUser = userRepository.save(newUser);

//        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(createdUser.getUsername(), createdUser.getPassword()));
//        String token =  tokenService.generateToken(authentication);

        RegisterResponse response = new RegisterResponse(LoginResponseStatus.OK.toString());

        // TODO: email check
        // TODO: create User
        // TODO: save

        // TODO: auth
        // TODO: create JWT token
        // TODO: Return it

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/user/delete")
    public ResponseEntity<String> delete() {
        // TODO: delete the user from the DB
        return ResponseEntity.noContent().build();
    }
}
