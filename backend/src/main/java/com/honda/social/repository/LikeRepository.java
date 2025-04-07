package com.honda.social.repository;

import com.honda.social.model.Like;
import com.honda.social.model.Post;
import com.honda.social.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
    Optional<Like> findByPostAndUser(Post post, User user);

    long countByPost(Post post);

    boolean existsByPostAndUser(Post post, User user);
}