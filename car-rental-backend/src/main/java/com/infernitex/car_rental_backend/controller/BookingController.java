package com.infernitex.car_rental_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.infernitex.car_rental_backend.model.Booking;
import com.infernitex.car_rental_backend.service.BookingService;
import com.infernitex.car_rental_backend.service.UserService;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private UserService userService;

    @GetMapping("hello")
    public String hello() {
        return "Hello from BookingController";
    }

    @GetMapping("/customer/{customerId}")
    public List<Booking> getBookingsByCustomerId(@PathVariable Long customerId) {
        return bookingService.getBookingsByCustomerId(customerId);
    }

    @PostMapping("/create")
    public Booking createBooking(@RequestBody Booking booking, @RequestParam String token) {
        if (userService.validateJwtToken(token)) {
            return bookingService.createBooking(booking);
        }
        return null;
    }
}
