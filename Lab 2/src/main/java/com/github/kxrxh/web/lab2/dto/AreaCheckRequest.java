package com.github.kxrxh.web.lab2.dto;

import com.github.kxrxh.web.lab2.beans.Coordinates;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class AreaCheckRequest {
    private Coordinates coordinates;
    private String currentTime;
}
