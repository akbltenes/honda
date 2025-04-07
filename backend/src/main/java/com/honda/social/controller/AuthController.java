package com.honda.social.controller;

import com.honda.social.dto.AuthResponseDto;
import com.honda.social.dto.ErrorResponseDto;
import com.honda.social.dto.LoginDto;
import com.honda.social.dto.UserDto;
import com.honda.social.exception.BadRequestException;
import com.honda.social.model.User;
import com.honda.social.security.JwtTokenProvider;
import com.honda.social.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserService userService;

    public AuthController(AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider,
            UserService userService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginDto loginDto) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginDto.getUsername(),
                            loginDto.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtTokenProvider.createToken(authentication.getName(), authentication.getAuthorities());

            return ResponseEntity.ok(new AuthResponseDto(jwt));
        } catch (BadCredentialsException e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponseDto(
                            "Kullanıcı adı veya şifre hatalı. Lütfen bilgilerinizi kontrol ediniz."));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponseDto(
                            "Giriş sırasında beklenmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyiniz."));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserDto userDto) {
        try {
            User user = userService.registerUser(userDto);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body("Kullanıcı başarıyla kaydedildi.");
        } catch (BadRequestException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponseDto(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponseDto(
                            "Kayıt sırasında beklenmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyiniz."));
        }
    }
}