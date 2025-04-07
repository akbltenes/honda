package com.honda.social.service;

import com.honda.social.dto.PostDto;
import com.honda.social.exception.BadRequestException;
import com.honda.social.exception.ResourceNotFoundException;
import com.honda.social.model.Post;
import com.honda.social.model.User;
import com.honda.social.repository.PostRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class PostService {

    private final PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @Transactional
    public Post createPost(PostDto postDto, User user) {
        Post post = Post.builder()
                .content(postDto.getContent())
                .imageUrl(postDto.getImageUrl())
                .user(user)
                .build();
        return postRepository.save(post);
    }

    public Page<Post> getAllPosts(Pageable pageable) {
        return postRepository.findAllByOrderByCreatedAtDesc(pageable);
    }

    public Post getPostById(Long id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post", "id", id));
    }

    @Transactional
    public Post updatePost(Long id, PostDto postDto, User user) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post", "id", id));

        // Sadece kendi gönderilerini düzenleyebilir
        if (!post.getUser().getId().equals(user.getId())) {
            throw new BadRequestException("Bu gönderiyi düzenleme yetkiniz yok");
        }

        post.setContent(postDto.getContent());
        if (postDto.getImageUrl() != null) {
            post.setImageUrl(postDto.getImageUrl());
        }
        return postRepository.save(post);
    }

    @Transactional
    public void deletePost(Long id, User user) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post", "id", id));

        // Sadece kendi gönderilerini silebilir
        if (!post.getUser().getId().equals(user.getId())) {
            throw new BadRequestException("Bu gönderiyi silme yetkiniz yok");
        }

        postRepository.delete(post);
    }
}