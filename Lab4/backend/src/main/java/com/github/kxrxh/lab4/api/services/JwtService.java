package com.github.kxrxh.lab4.api.services;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;

@Component
public class JwtService {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expiration;

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
                .expiration(new Date(expiration))
                .signWith(getSecretKey()).compact();
    }

    /**
     * Returns the secret key used for encryption.
     *
     * @return the secret key
     */
    private SecretKey getSecretKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        return Keys.hmacShaKeyFor(keyBytes);
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
        return Jwts.parser()
                .verifyWith(getSecretKey())
                .build()
                .parseSignedClaims(token).getPayload();
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
