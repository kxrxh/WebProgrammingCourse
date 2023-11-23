package com.github.kxrxh.lab4.api.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.github.kxrxh.lab4.api.database.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    /**
     * Retrieves the user details for the given username.
     *
     * @param username the username of the user
     * @return the user details for the given username
     * @throws UsernameNotFoundException if the user is not found
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<com.github.kxrxh.lab4.api.database.model.User> user = userRepository.findByLogin(username);
        if (user.isPresent()) {
            return User.withUsername(username).password(user.get().getPassword()).roles("USER").build();
        }
        return null;
    }

}
