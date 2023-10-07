package com.github.kxrxh.web.lab2.beans;

import java.util.Optional;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Coordinates {
    private float x;
    private double y;
    private float r;

    /**
     * Parses the given strings and returns an Optional containing the Coordinates
     * object.
     *
     * @param x the string representation of the x-coordinate
     * @param y the string representation of the y-coordinate
     * @param r the string representation of the radius
     * @return an Optional containing the parsed Coordinates object if parsing is
     *         successful,
     *         otherwise an empty Optional
     */
    public static Optional<Coordinates> parse(String x, String y, String r) {
        try {
            return Optional.of(new Coordinates(Float.parseFloat(x), Double.parseDouble(y), Float.parseFloat(r)));
        } catch (NumberFormatException e) {
            return Optional.empty();
        }
    }
}