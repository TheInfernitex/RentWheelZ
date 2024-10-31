package com.infernitex.car_rental_backend.controller;

import java.time.LocalDate;
import java.util.ArrayList;
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
    public List<Booking> getBookingsByCustomerId(@PathVariable Long customerId, @RequestParam String token) {
        if (!userService.validateJwtToken(token)) {
            return null;
        }
        return bookingService.getBookingsByCustomerId(customerId);
    }

    @PostMapping("/create")
    public Booking createBooking(@RequestBody Booking booking, @RequestParam String token) {
        if (userService.validateJwtToken(token)) {
            return bookingService.createBooking(booking);
        }
        return null;
    }

    @GetMapping("/unavailable-dates/{vehicleId}")
    public List<LocalDate> getBookedDatesByVehicleId(@PathVariable Long vehicleId, @RequestParam String token) {
        if (!userService.validateJwtToken(token)) {
            return null;
        }
        List<Booking> bookings = bookingService.getBookingsByVehicleId(vehicleId);
        List<LocalDate> bookedDates = new ArrayList<>();
        for (Booking booking : bookings) {
            LocalDate startDate = booking.getStartDate();
            LocalDate endDate = booking.getEndDate();
            addIntervalDatesToList(startDate, endDate, bookedDates);
        }
        return bookedDates;
    }

    // Helper method to add dates between start and end to the bookedDates list
    private void addIntervalDatesToList(LocalDate start, LocalDate end, List<LocalDate> bookedDates) {
        while (!start.isAfter(end)) {
            bookedDates.add(start);
            start = start.plusDays(1);
        }
    }

}
