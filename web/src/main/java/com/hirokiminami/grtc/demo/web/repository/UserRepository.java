package com.hirokiminami.grtc.demo.web.repository;

import com.hirokiminami.grtc.demo.web.model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Integer> {
    Optional<User> findByEmail(String email);
}
