// src/main/java/com/example/carrental/controller/UserController.java
package com.infernitex.car_rental_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.infernitex.car_rental_backend.model.User;
import com.infernitex.car_rental_backend.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/hello") // for experimenting
    public String signup() {
        return "Hello World!";
    }

    @PostMapping("/signup")
    public ResponseEntity<User> signup(@RequestBody User user) {
        User newUser = userService.registerUser(user);
        return ResponseEntity.ok(newUser);
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User user) {
        User loggedInUser = userService.loginUser(user.getEmail(), user.getPassword());
        if (loggedInUser != null) {
            return ResponseEntity.ok(loggedInUser);
        }
        return ResponseEntity.status(401).build();
    }

    @PostMapping("/forgotpass")
    public ResponseEntity<String> forgotPassword(@RequestBody User user) {
        String resetToken = userService.generateResetToken(user.getEmail());
        if (resetToken != null) {
            // TODO: Send an email with the reset token (implement this)
            return ResponseEntity.ok("Reset token : " + resetToken);
        }
        return ResponseEntity.status(404).body("User not found");
    }

    @PostMapping("/resetpass")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequest request) {
        boolean success = userService.resetPassword(request.getResetToken(), request.getNewPassword());
        if (success) {
            return ResponseEntity.ok("Password has been reset successfully.");
        }
        return ResponseEntity.status(400).body("Invalid or expired reset token.");
    }

    public static class ResetPasswordRequest {
        private String resetToken;
        private String newPassword;

        public String getResetToken() {
            return resetToken;
        }

        public void setResetToken(String resetToken) {
            this.resetToken = resetToken;
        }

        public String getNewPassword() {
            return newPassword;
        }

        public void setNewPassword(String newPassword) {
            this.newPassword = newPassword;
        }
    }
}
