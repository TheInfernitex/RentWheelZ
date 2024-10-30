package com.infernitex.car_rental_backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.infernitex.car_rental_backend.model.Booking;
import com.infernitex.car_rental_backend.repository.BookingRepository;

@Service
public class BookingService {
    
    @Autowired
    private BookingRepository bookingRepository;


    public List<Booking> getBookingsByCustomerId(Long customerId) {
        return bookingRepository.findByCustomerId(customerId);
    }

    public Booking createBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

}
