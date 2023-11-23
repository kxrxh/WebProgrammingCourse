package com.github.kxrxh.lab4.api.web;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.github.kxrxh.lab4.api.database.UserRepository;
import com.github.kxrxh.lab4.api.database.model.User;
import com.github.kxrxh.lab4.api.dto.LoginRequest;
import com.github.kxrxh.lab4.api.dto.AuthResponse;
import com.github.kxrxh.lab4.api.dto.RegisterRequest;
import com.github.kxrxh.lab4.api.security.JwtUtil;
import com.github.kxrxh.lab4.api.services.CustomUserDetailsService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody LoginRequest authRequest) throws Exception {
        try {
            authenticate(authRequest.getUsername(), authRequest.getPassword());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new AuthResponse("Error", "Wrong username or password", null));
        }
        final UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getUsername());
        if (userDetails == null) {
            return ResponseEntity.badRequest().body(new AuthResponse("Error", "Wrong username or password", null));
        }
        final String token = jwtUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthResponse("Success", "User successfully authorized", token));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest request) {
        final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());

        // Check if the username is available
        if (userDetails != null) {
            return ResponseEntity.badRequest().body("User with this username already exists");
        }

        // Extract the username and password from the request
        String username = request.getUsername();
        String password = request.getPassword();

        // Create a new user and save to the database
        User newUser = new User();
        newUser.setLogin(username);
        newUser.setPassword(hashPasswordSHA256(password));
        userRepository.save(newUser);

        final String token = jwtUtil.generateToken(userDetails);
        if (token == null) {
            return ResponseEntity.internalServerError()
                    .body(new AuthResponse("Error", "Unable to generate user token", null));
        }

        // Return a response entity with a success message
        return ResponseEntity.ok(new AuthResponse("Success", "User registered successfully", null));
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(username, hashPasswordSHA256(password)));
        } catch (Exception e) {
            throw new Exception("Invalid username or password", e);
        }
    }

    /**
     * Hashes a password using the SHA-256 algorithm.
     *
     * @param password the password to be hashed
     * @return the hashed password as a hexadecimal string
     */
    private String hashPasswordSHA256(String password) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] encodedHash = digest.digest(password.getBytes());

            StringBuilder hexString = new StringBuilder(2 * encodedHash.length);
            for (byte b : encodedHash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
            }

            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            // Handle exception
            throw new RuntimeException("Error hashing password with SHA-256", e);
        }
    }
}