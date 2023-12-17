package com.github.kxrxh.lab4.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
    public LoginResponse(String message) {
        this.message = message;
        this.token = null;
    }

    private String message;
    private String token;
}
