package com.github.kxrxh.lab4.api.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class PointsRequest {
    private String login;
    private Double r;
}
