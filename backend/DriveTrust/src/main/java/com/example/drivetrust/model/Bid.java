package com.example.drivetrust.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
public class Bid {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long postId;
    private Long driverId;
    
    private Double amount; // The quoted price
    private String message; // E.g., "Can pick up tomorrow morning"
    
    @Enumerated(EnumType.STRING)
    private BidStatus status = BidStatus.PENDING;
    
    @Enumerated(EnumType.STRING)
    private EscrowStatus escrowStatus = EscrowStatus.UNPAID; // Handling the payment edge case

    private LocalDateTime createdAt = LocalDateTime.now();

    public enum BidStatus {
        PENDING, ACCEPTED, REJECTED
    }

    public enum EscrowStatus {
        UNPAID, FUNDS_SECURED, RELEASED_TO_DRIVER
    }
}