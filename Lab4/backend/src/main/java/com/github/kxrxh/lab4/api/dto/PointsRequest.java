package com.github.kxrxh.lab4.api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
@AllArgsConstructor
public class PointsRequest {
    @JsonProperty("r_value")
    private Double r;
}
