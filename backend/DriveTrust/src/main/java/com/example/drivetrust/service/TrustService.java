package com.example.drivetrust.service;

import com.example.drivetrust.model.Bid;
import com.example.drivetrust.model.LoadPost;
import com.example.drivetrust.repository.BidRepository;
import com.example.drivetrust.repository.LoadPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import java.util.List;

@Service
public class TrustService {

    @Autowired
    private LoadPostRepository postRepository;

    @Autowired
    private BidRepository bidRepository;

    // 1. Create a Post
    public LoadPost createPost(LoadPost post) {
        return postRepository.save(post);
    }

    // 2. Submit a Bid
    public Bid submitBid(Bid bid) {
        return bidRepository.save(bid);
    }

    // 3. THIS IS THE MAGIC: Accept a bid, lock escrow, and reject other drivers
    @Transactional
    public void acceptBidAndLockEscrow(Long bidId) {
        Bid acceptedBid = bidRepository.findById(bidId)
                .orElseThrow(() -> new RuntimeException("Bid not found"));

        LoadPost post = postRepository.findById(acceptedBid.getPostId())
                .orElseThrow(() -> new RuntimeException("Post not found"));

        // Step A: Mark this bid as accepted and mock the Escrow funding
        acceptedBid.setStatus(Bid.BidStatus.ACCEPTED);
        acceptedBid.setEscrowStatus(Bid.EscrowStatus.FUNDS_SECURED); // Solves Payment Edge Case
        bidRepository.save(acceptedBid);

        // Step B: Mark the post as booked
        post.setStatus(LoadPost.PostStatus.BOOKED);
        postRepository.save(post);

        // Step C: Reject all other competing bids for this post
        List<Bid> allBids = bidRepository.findByPostId(post.getId());
        for (Bid b : allBids) {
            if (!b.getId().equals(bidId)) {
                b.setStatus(Bid.BidStatus.REJECTED);
                bidRepository.save(b);
            }
        }
    }
}