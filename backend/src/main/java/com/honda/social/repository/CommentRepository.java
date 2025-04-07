package com.honda.social.repository;

import com.honda.social.model.Comment;
import com.honda.social.model.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    Page<Comment> findByPostOrderByCreatedAtDesc(Post post, Pageable pageable);
}