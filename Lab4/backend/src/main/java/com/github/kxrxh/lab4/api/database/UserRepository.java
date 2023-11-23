package com.github.kxrxh.lab4.api.database;

import java.util.Optional;

import org.springframework.data.repository.Repository;

import com.github.kxrxh.lab4.api.database.model.User;

public interface UserRepository extends Repository<User, Long> {
    User save(User user);

    Optional<User> findById(Long id);

    Optional<User> findByLogin(String login);

    Optional<User> findByLoginAndPassword(String login, String password);
}
