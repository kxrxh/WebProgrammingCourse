package com.github.kxrxh.web.lab2.dto;

import com.google.gson.Gson;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class ControllerRequest {
    private String action;
    private Float x;
    private Double y;
    private Float r;
    private Long currentTime;

    public static ControllerRequest parse(String JsonString) {
        return new Gson().fromJson(JsonString, ControllerRequest.class);

    }
}
