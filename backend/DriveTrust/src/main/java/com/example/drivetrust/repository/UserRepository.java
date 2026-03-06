package com.example.drivetrust.repository;

import com.example.drivetrust.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // This allows us to search the DB for an email during login
    Optional<User> findByEmail(String email);
}