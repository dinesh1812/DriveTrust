package com.example.drivetrust.repository;

import com.example.drivetrust.model.LoadPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LoadPostRepository extends JpaRepository<LoadPost, Long> {
    List<LoadPost> findByStatusOrderByCreatedAtDesc(LoadPost.PostStatus status);
}