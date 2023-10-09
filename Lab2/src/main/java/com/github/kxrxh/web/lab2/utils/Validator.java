package com.github.kxrxh.web.lab2.utils;

import java.util.HashSet;
import java.util.Set;

public class Validator {
    private static final Set<Double> xValues = new HashSet<>(Set.of(-2.0, -1.5, -1.0, -0.5, 0.0, 0.5, 1.0, 1.5, 2.0));
    private static final Set<Double> rValues = new HashSet<>(Set.of(1.0, 1.5, 2.0, 2.5, 3.0));

    public static boolean validateCoordinates(Float x, Double y, Float r) {
        boolean xValid = x != null && xValues.contains((double) x);
        boolean yValid = y != null && y >= -5 && y <= 3;
        boolean rValid = r != null && rValues.contains((double) r);

        return xValid && yValid && rValid;
    }
}