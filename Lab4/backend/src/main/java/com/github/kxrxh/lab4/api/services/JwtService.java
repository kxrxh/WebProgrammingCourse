package com.github.kxrxh.lab4.api.services;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.IOException;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;

@Component
public class JwtService {

    @Value("${jwt.expiration}")
    private long expiration;

    private static final String SECRET_FILE_NAME = "key.pem";

    private SecretKey secretKey;

    /**
     * Generates a token for the given user.
     *
     * @param userName the username of the user for whom the token is generated
     * @return the generated token
     */
    public String generateToken(String userName) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, userName);
    }

    /**
     * Generates a token based on the provided claims and user name.
     *
     * @param claims   a map of claims for the token
     * @param userName the user name associated with the token
     * @return the generated token
     */
    private String createToken(Map<String, Object> claims, String userName) {
        return Jwts.builder()
                .claims(claims)
                .subject(userName)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSecretKey()).compact();
    }

    private SecretKey getSecretKey() {
        if (secretKey == null) {
            try {
                secretKey = loadOrCreateSecretKey();
            } catch (java.io.IOException e) {
                e.printStackTrace();
                return null;
            }
        }
        return secretKey;
    }

    private SecretKey loadOrCreateSecretKey() throws java.io.IOException {
        try {
            Path jarDirectory = Path.of(System.getProperty("user.dir"));
            Path secretFilePath = jarDirectory.resolve(SECRET_FILE_NAME);

            if (Files.exists(secretFilePath)) {
                byte[] keyBytes = Files.readAllBytes(secretFilePath);
                return Keys.hmacShaKeyFor(Base64.getDecoder().decode(keyBytes));
            } else {
                SecretKey generatedKey = generateAndSaveKey(secretFilePath);
                return generatedKey;
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to load or create JWT secret key", e);
        }
    }

    private SecretKey generateAndSaveKey(Path secretFilePath) throws IOException, java.io.IOException {
        SecretKey generatedKey = Jwts.SIG.HS256.key().build();
        byte[] encodedKey = Base64.getEncoder().encode(generatedKey.getEncoded());

        // Append the secret file name to the JAR directory
        try {
            Files.write(secretFilePath, encodedKey, StandardOpenOption.CREATE, StandardOpenOption.WRITE);
        } catch (IOException e) {
            throw new IOException("Failed to write secret key to file", e);
        }

        return generatedKey;
    }

    /**
     * Extracts the username from the given token.
     *
     * @param token the token from which to extract the username
     * @return the extracted username as a String
     */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * Extracts the expiration date from a given token.
     *
     * @param token the token from which to extract the expiration date
     * @return the expiration date extracted from the token
     */
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    /**
     * Extracts a claim from a token using the given claims resolver function.
     *
     * @param token          the token from which to extract the claim
     * @param claimsResolver the function used to resolve the claim from the token
     * @return the extracted claim
     */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    /**
     * Extracts all claims from a given token.
     *
     * @param token the token from which to extract the claims
     * @return the extracted claims
     */
    private Claims extractAllClaims(String token) {
        try {
            return Jwts.parser()
                    .verifyWith(getSecretKey())
                    .build()
                    .parseSignedClaims(token).getPayload();
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse JWT token", e);
        }
    }

    /**
     * Checks if the given token is expired.
     *
     * @param token the token to check for expiration
     * @return true if the token is expired, false otherwise
     */
    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    /**
     * Validates the given token against the user details.
     *
     * @param token       the token to validate
     * @param userDetails the user details to validate against
     * @return true if the token is valid, false otherwise
     */
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

}
