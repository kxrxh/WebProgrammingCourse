package com.github.kxrxh.web.types;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Point {
    private Double x;
    private Double y;
    private Integer r;
    private Boolean result;
    private String time;

}
