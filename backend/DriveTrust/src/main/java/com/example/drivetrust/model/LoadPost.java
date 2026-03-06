package com.example.drivetrust.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
public class LoadPost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long customerId; // The user who posted this
    
    private String origin;
    private String destination;
    private String requiredVehicle;
    private Double estimatedWeightKg;
    
    @Enumerated(EnumType.STRING)
    private PostStatus status = PostStatus.OPEN;

    private boolean transitInsuranceAdded = false;
    private LocalDateTime createdAt = LocalDateTime.now();

    public enum PostStatus {
        OPEN, BOOKED, IN_TRANSIT, DELIVERED, CANCELLED
    }
}