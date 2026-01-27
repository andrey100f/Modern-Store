package com.ubb.auth.util;

import com.ubb.auth.model.User;
import com.ubb.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class UserSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        var user = userRepository.findByEmail("system@admin.com");

        if (user.isEmpty()) {
            var adminUser = User.builder()
                .username("admin")
                .email("system@admin.com")
                .password(passwordEncoder.encode("admin"))
                .roles(List.of("USER"))
                .build();

            userRepository.save(adminUser);
        }
    }

}
