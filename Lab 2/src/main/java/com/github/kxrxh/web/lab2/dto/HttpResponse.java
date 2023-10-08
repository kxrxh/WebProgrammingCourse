package com.github.kxrxh.web.lab2.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class HttpResponse {
    protected int statusCode;
    protected String content;
}
