package com.github.kxrxh.lab4.api.web;

import com.github.kxrxh.lab4.api.database.PointRepository;
import com.github.kxrxh.lab4.api.database.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class HelloController {

    @Autowired
    private PointRepository pointRepository;

    @Autowired
    private UserRepository userRepository;
    
}
