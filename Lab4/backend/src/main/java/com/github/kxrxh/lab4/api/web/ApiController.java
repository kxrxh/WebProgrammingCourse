package com.github.kxrxh.lab4.api.web;

import com.github.kxrxh.lab4.api.database.PointRepository;
import com.github.kxrxh.lab4.api.database.UserRepository;
import com.github.kxrxh.lab4.api.database.model.AppUser;
import com.github.kxrxh.lab4.api.database.model.Point;
import com.github.kxrxh.lab4.api.dto.BasicResponse;
import com.github.kxrxh.lab4.api.dto.PointsResponse;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ApiController {

    @Autowired
    private PointRepository pointRepository;

    @Autowired
    private UserRepository userRepository;

    @CrossOrigin
    @GetMapping("/points")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<PointsResponse> getUserPoints(@RequestParam("r") Double r) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // Retrieve the username from the token claims
        String username = authentication.getName();

        if (username == null) {
            return ResponseEntity.badRequest()
                    .body(new PointsResponse("Bad Request. Unable to extract username from token"));
        }

        if (r == null) {
            return ResponseEntity.badRequest().body(new PointsResponse("Bad Request. R is required"));
        }

        Optional<List<Point>> points = pointRepository.findByUserNameAndR(username, r);

        if (points.isPresent()) {
            return ResponseEntity.ok(new PointsResponse(points.orElse(List.of())));
        }

        return ResponseEntity.badRequest().body(new PointsResponse("Bad Request. User not found"));
    }

    @CrossOrigin
    @PostMapping("/points")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    @Transactional
    public ResponseEntity<PointsResponse> addPoints(@RequestParam("x") Double x, @RequestParam("y") Double y,
            @RequestParam("r") Double r) {

        if (x == null || y == null || r == null) {
            return ResponseEntity.badRequest().body(new PointsResponse("Bad Request. All parameters are required"));
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        if (username == null) {
            return ResponseEntity.badRequest()
                    .body(new PointsResponse("Bad Request. Unable to extract username from token"));
        }
        AppUser user = userRepository.findByName(username).get();

        if (user == null) {
            return ResponseEntity.badRequest()
                    .body(new PointsResponse("Bad Request. Unable to extract username from token"));
        }
        Point p = pointRepository.save(new Point(x, y, r, user));
        if (p == null) {
            return ResponseEntity.badRequest().body(new PointsResponse("Bad Request. Unable to save point"));
        }
        return ResponseEntity.ok(new PointsResponse(List.of(p)));
    }

    @CrossOrigin
    @DeleteMapping("/points")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    @Transactional
    public ResponseEntity<BasicResponse> deletePoints(@RequestParam("r") Double r) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        if (username == null) {
            return ResponseEntity.badRequest()
                    .body(new BasicResponse("Bad Request. Unable to extract username from token"));
        }
        if (r == null) {
            return ResponseEntity.badRequest().body(new BasicResponse("Bad Request. R is required"));
        }
        pointRepository.deleteByUserNameAndR(username, r);
        return ResponseEntity.ok(new BasicResponse("ok"));
    }

    @CrossOrigin
    @DeleteMapping("/users")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<BasicResponse> deleteUsers() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        if (username == null) {
            return ResponseEntity.badRequest()
                    .body(new BasicResponse("Bad Request. Unable to extract username from token"));
        }
        userRepository.deleteByName(username);
        return ResponseEntity.ok(new BasicResponse("ok"));
    }
}
