package com.github.kxrxh.lab4.api.database;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.Repository;

import com.github.kxrxh.lab4.api.database.model.Point;

public interface PointRepository extends Repository<Point, Long> {
    Point save(Point point);

    Optional<Point> findById(Long id);

    Optional<List<Point>> findByUserNameAndR(String userName, Double r);

    Optional<List<Point>> findByR(Double r);

}