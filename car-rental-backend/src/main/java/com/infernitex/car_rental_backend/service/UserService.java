// src/main/java/com/example/carrental/service/UserService.java
package com.infernitex.car_rental_backend.service;

import com.infernitex.car_rental_backend.model.User;
import com.infernitex.car_rental_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

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

    // Method to generate a reset token and set its expiry
    public String generateResetToken(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            return null; // User not found
        }

        String resetToken = UUID.randomUUID().toString(); // Generate a unique token
        user.setResetToken(resetToken);
        user.setResetTokenExpiry(LocalDateTime.now().plusHours(1)); // Set expiry time (1 hour from now)
        userRepository.save(user); // Save the user with the reset token

        return resetToken; // Return the reset token (for testing purposes)
    }

    // Method to reset the user's password using the reset token
    public boolean resetPassword(String resetToken, String newPassword) {
        User user = userRepository.findByResetToken(resetToken);
        if (user != null && user.getResetTokenExpiry().isAfter(LocalDateTime.now())) {
            user.setPassword(newPassword); // Update the password
            user.setResetToken(null); // Clear the reset token
            user.setResetTokenExpiry(null); // Clear the expiry
            userRepository.save(user); // Save the updated user
            return true; // Password reset successful
        }
        return false; // Invalid token or token expired
    }
}
