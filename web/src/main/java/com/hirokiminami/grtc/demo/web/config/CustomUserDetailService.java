package com.hirokiminami.grtc.demo.web.config;

import com.hirokiminami.grtc.demo.web.model.User;
import com.hirokiminami.grtc.demo.web.repository.UserRepository;
import com.hirokiminami.grtc.demo.web.service.UserService;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
@Configuration
public class CustomUserDetailService implements UserDetailsService {
    private final UserService userService;
    private final UserRepository userRepository;

    public CustomUserDetailService(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email).orElse(null);

        if (user == null) {
            throw new UsernameNotFoundException("Not found with the email" + email);
        }
        return user;
    }
}
