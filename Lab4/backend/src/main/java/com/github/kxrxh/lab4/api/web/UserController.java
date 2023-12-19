package com.github.kxrxh.lab4.api.web;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import com.github.kxrxh.lab4.api.database.UserRepository;
import com.github.kxrxh.lab4.api.database.model.AppUser;
import com.github.kxrxh.lab4.api.dto.AuthRequest;
import com.github.kxrxh.lab4.api.dto.LoginResponse;
import com.github.kxrxh.lab4.api.dto.RegResponse;
import com.github.kxrxh.lab4.api.services.JwtService;
import com.github.kxrxh.lab4.api.services.UserInfoService;

@RestController
@RequestMapping(value = "/auth", produces = "application/json", consumes = "application/json")
public class UserController {

    @Autowired
    private UserInfoService service;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<RegResponse> register(@RequestBody AuthRequest userInfo) {
        if (userRepository.findByName(userInfo.getUsername()).isPresent()) {

            throw new UsernameNotFoundException("User already exists");
        }

        Optional<String> result = service.addUser(new AppUser(userInfo.getUsername(), userInfo.getPassword()));
        if (result.isPresent()) {
            return ResponseEntity.ok(new RegResponse(result.get()));
        }
        return ResponseEntity.badRequest().body(new RegResponse("Registration failed. User already exists"));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody AuthRequest authRequest) {
        if (authRequest.getUsername() == null || authRequest.getPassword() == null) {
            return ResponseEntity.badRequest()
                    .body(new LoginResponse("Bad Request. Must provide username and password", null));
        }
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        if (authentication.isAuthenticated()) {
            return ResponseEntity.ok(new LoginResponse("OK", jwtService.generateToken(authRequest.getUsername())));
        }
        System.out.println("Authentication failed");
        return ResponseEntity.badRequest().body(new LoginResponse("Bad Request. Login or password is incorrect", null));
    }

}
