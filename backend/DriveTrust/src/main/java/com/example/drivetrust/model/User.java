package com.example.drivetrust.model;

import jakarta.persistence.*;
import lombok.Data;

@Data // Lombok automatically creates Getters and Setters
@Entity
@Table(name = "users") // 'user' is often a reserved keyword in databases
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String password;
    
    @Enumerated(EnumType.STRING)
    private Role role; // CUSTOMER or DRIVER

    private boolean isKycVerified = true; // Simulating successful KYC for MVP
    private String vehicleType; // Only used if role is DRIVER

    public enum Role {
        CUSTOMER, DRIVER
    }
}