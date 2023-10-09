package com.github.kxrxh.web.lab2.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public final class HttpNewRowResponse extends HttpResponse {
    private Boolean isHit;

    public HttpNewRowResponse(int statusCode, String content, Boolean isHit) {
        super(statusCode, content);
        this.isHit = isHit;
    }
}
