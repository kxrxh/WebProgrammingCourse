package com.github.kxrxh.web.lab2.beans;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class HttpResponse {
    private int statusCode;
    private String content;
}
