// src/main/java/com/example/carrental/service/UserService.java
package com.infernitex.car_rental_backend.service;

import com.infernitex.car_rental_backend.model.User;
import com.infernitex.car_rental_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) {
        return userRepository.save(user);
    }

    public User loginUser(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user != null && user.getPassword().equals(password)) {
            return user; // Consider using hashed passwords for production
        }
        return null; // Invalid login
    }
}