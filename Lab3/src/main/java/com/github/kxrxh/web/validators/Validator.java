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
        Boolean rect = isInsideRect(xValue, yValue, selectedR);
        Boolean triangle = isInsideTriangle(xValue, yValue, selectedR);
        return circ || rect || triangle;
    }

    private static Boolean isInsideCircle(Double xValue, Double yValue, Integer selectedR) {
        return (xValue <= 0 && yValue >= 0) &&
                ((Math.pow(xValue, 2) + Math.pow(yValue, 2)) <= (Math.pow(selectedR / 2.0, 2)));
    }

    private static Boolean isInsideRect(Double xValue, Double yValue, Integer selectedR) {
        return (xValue <= 0 && yValue <= 0) && (xValue >= (-selectedR / 2.0) && yValue >= -selectedR);
    }

    private static Boolean isInsideTriangle(Double x, Double y, Integer R) {
        double alpha = -y / R;
        double beta = x / (R / 2.0);
        double gamma = 1 - alpha - beta;

        return alpha >= 0 && alpha <= 1 && beta >= 0 && beta <= 1 && gamma >= 0 && gamma <= 1;
    }
}
