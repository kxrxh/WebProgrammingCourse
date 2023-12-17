package com.github.kxrxh.lab4.api.web;

import com.github.kxrxh.lab4.api.database.PointRepository;
import com.github.kxrxh.lab4.api.database.UserRepository;
import com.github.kxrxh.lab4.api.database.model.Point;
import com.github.kxrxh.lab4.api.dto.PointsRequest;
import com.github.kxrxh.lab4.api.dto.PointsResponse;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ApiController {

    @Autowired
    private PointRepository pointRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/user/points")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<PointsResponse> getUserPoints(@RequestBody PointsRequest pointsRequest) {
        if (pointsRequest.getR() == null) {
            return ResponseEntity.badRequest().body(new PointsResponse("Bad Request. R is required"));
        }

        if (pointsRequest.getLogin() == null) {
            return ResponseEntity.badRequest().body(new PointsResponse("Bad Request. Login is required"));
        }

        Optional<List<Point>> points = pointRepository.findByUserNameAndR(pointsRequest.getLogin(),
                pointsRequest.getR());

        if (points.isPresent()) {
            return ResponseEntity.ok(new PointsResponse(points.get()));
        }

        return ResponseEntity.notFound().build();

    }
}
