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

    @ManyToOne
    @JsonIgnore
    private AppUser user;

    public Point(Double x, Double y, Double r, AppUser user) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.user = user;
    }

}
