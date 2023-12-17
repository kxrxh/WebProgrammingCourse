package com.github.kxrxh.lab4.api.dto;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@NoArgsConstructor
public class AuthRequest {
    private String username;
    private String password;
}
