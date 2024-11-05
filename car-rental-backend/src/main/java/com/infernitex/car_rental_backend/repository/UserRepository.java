// src/main/java/com/example/carrental/repository/UserRepository.java

package com.infernitex.car_rental_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.infernitex.car_rental_backend.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    User findByResetToken(String resetToken);
    User findById(long id);


    // @Modifying
    // @Query("UPDATE User u SET u.resetToken = :resetToken, u.resetTokenExpiry = :expiry WHERE u.email = :email")
    // void updateResetTokenByEmail(@Param("email") String email, @Param("resetToken") String resetToken, @Param("expiry") LocalDateTime expiry);
}
