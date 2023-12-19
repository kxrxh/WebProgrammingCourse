package com.github.kxrxh.lab4.api.dto;

import java.util.List;

import com.github.kxrxh.lab4.api.database.model.Point;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class PointsResponse {
    public PointsResponse(String message) {
        this.points = List.of();
        this.message = message;
    }

    public PointsResponse(List<Point> points) {
        this.points = points;
        this.message = "ok";
    }

    private List<Point> points;
    private String message;

}
