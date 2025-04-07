package com.honda.social.service;

import com.honda.social.dto.UserDto;
import com.honda.social.exception.BadRequestException;
import com.honda.social.exception.ResourceNotFoundException;
import com.honda.social.model.User;
import com.honda.social.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public User registerUser(UserDto userDto) {
        if (userRepository.existsByUsername(userDto.getUsername())) {
            throw new BadRequestException(
                    "Bu kullanıcı adı zaten kullanılıyor. Lütfen farklı bir kullanıcı adı seçiniz.");
        }

        if (userRepository.existsByEmail(userDto.getEmail())) {
            throw new BadRequestException(
                    "Bu e-posta adresi zaten kullanılıyor. Lütfen farklı bir e-posta adresi deneyiniz.");
        }

        // Şifre uzunluk kontrolü
        if (userDto.getPassword() == null || userDto.getPassword().length() < 6) {
            throw new BadRequestException("Şifre en az 6 karakter uzunluğunda olmalıdır.");
        }

        // Email formatı kontrolü
        if (userDto.getEmail() == null || !userDto.getEmail().contains("@")) {
            throw new BadRequestException("Geçerli bir e-posta adresi giriniz.");
        }

        User user = User.builder()
                .username(userDto.getUsername())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .email(userDto.getEmail())
                .fullName(userDto.getFullName())
                .profileImage(userDto.getProfileImage())
                .active(true)
                .createdAt(LocalDateTime.now())
                .build();

        return userRepository.save(user);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Kullanıcı", "username", username));
    }

    public User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Kullanıcı", "id", id));
    }
}