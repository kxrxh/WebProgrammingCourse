package com.github.kxrxh.lab4.api.database;

import java.util.Optional;

import org.springframework.data.repository.Repository;
import com.github.kxrxh.lab4.api.database.model.AppUser;

public interface UserRepository extends Repository<AppUser, Long> {
    AppUser save(AppUser user);

    Optional<AppUser> findById(Long id);

    Optional<AppUser> findByName(String name);

    Optional<AppUser> findByNameAndPassword(String name, String password);
}
