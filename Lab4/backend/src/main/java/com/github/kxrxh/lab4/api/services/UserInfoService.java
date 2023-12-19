package com.github.kxrxh.lab4.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.github.kxrxh.lab4.api.database.UserInfoDetails;
import com.github.kxrxh.lab4.api.database.UserRepository;
import com.github.kxrxh.lab4.api.database.model.AppUser;

import java.util.Optional;

@Service
public class UserInfoService implements UserDetailsService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private PasswordEncoder encoder;

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {

        Optional<AppUser> userDetail = repository.findByName(login);

        // Converting userDetail to UserDetails
        return userDetail.map(UserInfoDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("User not found " + login));
    }

    public Optional<String> addUser(AppUser userInfo) {
        if (repository.findByName(userInfo.getName()).isPresent()) {
            return Optional.empty();
        }
        userInfo.setPassword(encoder.encode(userInfo.getPassword()));
        repository.save(userInfo);
        return Optional.of("User Added Successfully");
    }

}
