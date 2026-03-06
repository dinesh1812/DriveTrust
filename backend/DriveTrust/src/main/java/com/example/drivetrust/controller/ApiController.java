package com.example.drivetrust.controller;

import com.example.drivetrust.model.Bid;
import com.example.drivetrust.model.LoadPost;
import com.example.drivetrust.model.User;
import com.example.drivetrust.repository.BidRepository;
import com.example.drivetrust.repository.LoadPostRepository;
import com.example.drivetrust.repository.UserRepository;
import com.example.drivetrust.service.TrustService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173") // Allows your React app to connect
public class ApiController {

    @Autowired
    private TrustService trustService;

    @Autowired
    private LoadPostRepository postRepository;

    @Autowired
    private BidRepository bidRepository;

    @Autowired
    private UserRepository userRepository;

    // --- AUTHENTICATION ENDPOINTS ---

    @PostMapping("/users/signup")
    public User signup(@RequestBody User user) {
        // Check if email already exists
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already in use");
        }
        // Save the new user to the database
        return userRepository.save(user);
    }

    @PostMapping("/users/login")
    public User login(@RequestBody User loginRequest) {
        // Find user by email
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Check password
        if (!user.getPassword().equals(loginRequest.getPassword())) {
            throw new RuntimeException("Invalid Password");
        }
        
        // Check if they selected the correct role
        if (!user.getRole().equals(loginRequest.getRole())) {
            throw new RuntimeException("Invalid Role selection. Are you sure you are a " + loginRequest.getRole() + "?");
        }
        
        return user;
    }

    // --- LOAD POST ENDPOINTS ---

    @GetMapping("/posts")
    public List<LoadPost> getOpenPosts() {
        // Drivers see open posts here
        return postRepository.findByStatusOrderByCreatedAtDesc(LoadPost.PostStatus.OPEN);
    }

    @PostMapping("/posts")
    public LoadPost createPost(@RequestBody LoadPost post, @RequestHeader("X-User-Id") Long customerId) {
        post.setCustomerId(customerId); // Simulating the logged-in customer
        return trustService.createPost(post);
    }

    // --- BIDDING & ESCROW ENDPOINTS ---

    @GetMapping("/posts/{postId}/bids")
    public List<Bid> getBidsForPost(@PathVariable Long postId) {
        // Customers view all quotes for their post
        return bidRepository.findByPostId(postId);
    }

    @PostMapping("/bids")
    public Bid submitBid(@RequestBody Bid bid, @RequestHeader("X-User-Id") Long driverId) {
        bid.setDriverId(driverId); // Simulating the logged-in driver
        return trustService.submitBid(bid);
    }

    @PostMapping("/bids/{bidId}/accept")
    public String acceptBid(@PathVariable Long bidId) {
        trustService.acceptBidAndLockEscrow(bidId);
        return "Bid Accepted & Escrow Funded Successfully!";
    }
}