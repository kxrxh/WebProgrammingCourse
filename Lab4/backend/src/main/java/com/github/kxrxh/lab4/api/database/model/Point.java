package com.github.kxrxh.lab4.api.database.model;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Point implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long id;

    @Column(nullable = false)
    @JsonProperty("x")
    private Double x;

    @Column(nullable = false)
    @JsonProperty("y")
    private Double y;

    @Column(nullable = false)
    @JsonProperty("r")
    private Double r;

    @Column(nullable = false)
    @JsonProperty("hit")
    private Boolean hit;

    @Column(nullable = false)
    @JsonProperty("time")
    private Long time;

    @ManyToOne
    @JsonIgnore
    private AppUser user;

    public Point(Double x, Double y, Double r, AppUser user) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.hit = isHit(x, y, r);
        this.user = user;
        this.time = System.currentTimeMillis();
    }

    public static boolean isHit(Double xValue, Double yValue, Double rValue) {
        Boolean circ = isInsideCircle(xValue, yValue, rValue);
        Boolean rect = isInsideRect(xValue, yValue, rValue);
        Boolean triangle = isInsideTriangle(xValue, yValue, rValue);
        return circ || rect || triangle;
    }

    private static Boolean isInsideCircle(Double xValue, Double yValue, Double rValue) {
        return (xValue <= 0 && yValue >= 0) &&
                ((Math.pow(xValue, 2) + Math.pow(yValue, 2)) <= (Math.pow(rValue / 2.0, 2)));
    }

    private static Boolean isInsideRect(Double xValue, Double yValue, Double rValue) {
        return (xValue <= 0 && yValue <= 0) && (xValue >= (-rValue / 2.0) && yValue >= -rValue);
    }

    private static Boolean isInsideTriangle(Double x, Double y, Double R) {
        double alpha = -y / R;
        double beta = x / (R / 2.0);
        double gamma = 1 - alpha - beta;

        return alpha >= 0 && alpha <= 1 && beta >= 0 && beta <= 1 && gamma >= 0 && gamma <= 1;
    }

}
