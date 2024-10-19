package com.infernitex.car_rental_backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class EmailService {

    @Value("${brevo.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate;

    public EmailService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public void sendPasswordResetEmail(String toEmail, String resetToken) {
        String url = "https://api.brevo.com/v3/smtp/email";

        HttpHeaders headers = new HttpHeaders();
        headers.set("api-key", apiKey);
        headers.set("Content-Type", "application/json");

        Map<String, Object> emailData = new HashMap<>();
        emailData.put("sender", Map.of("name", "RentWheelZ Developer", "email", "infernitex@outlook.com"));
        emailData.put("to", List.of(Map.of("email", toEmail)));
        emailData.put("subject", "Password Reset Request");
        emailData.put("htmlContent", "<html><body style='font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px;'>"
                + "<div style='max-width: 600px; margin: auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);'>"
                + "<h1 style='color: #333;'>Password Reset</h1>"
                + "<p style='color: #555;'>We received a request to reset your password. Please copy the reset token below:</p>"
                + "<p style='margin: 20px 0;'><strong>Reset Token (Valid for 3 minutes):</strong></p>"
                + "<code style='display: block; background: #f1f1f1; padding: 10px; border-radius: 5px; font-size: 16px; word-break: break-all;'>" + resetToken + "</code>"
                + "<p style='color: #555;'>If you did not request this, please ignore this email.</p>"
                + "<p style='color: #888; font-size: 12px;'>Thanks,<br>The RentWheelZ Team</p>"
                + "</div>"
                + "</body></html>");

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(emailData, headers);

        ResponseEntity<String> response = restTemplate.exchange(
                url, HttpMethod.POST, request, String.class);

        // Log response or handle errors here
    }
}
