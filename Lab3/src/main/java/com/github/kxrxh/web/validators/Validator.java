package com.github.kxrxh.web.validators;

public class Validator {
    public static boolean validateInput(Double xValue, Double yValue, Integer selectedR) {
        if (xValue == null || yValue == null || selectedR == null) {
            return false;
        }
        if (xValue < -5 || xValue > 5) {
            return false;
        }
        if (yValue < -5 || yValue > 5) {
            return false;
        }
        if (selectedR < 1 || selectedR > 5) {
            return false;
        }
        return true;
    }

    public static boolean isHit(Double xValue, Double yValue, Integer selectedR) {
        Boolean circ = isInsideCircle(xValue, yValue, selectedR);
        return circ;
    }

    private static Boolean isInsideCircle(Double xValue, Double yValue, Integer selectedR) {
        return (xValue <= 0 && yValue >= 0) &&
                ((Math.pow(xValue, 2) + Math.pow(yValue, 2)) <= (Math.pow(selectedR / 2, 2)));
    }
}
