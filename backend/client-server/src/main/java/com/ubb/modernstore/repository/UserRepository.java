package com.ubb.modernstore.repository;

import com.ubb.modernstore.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
}
