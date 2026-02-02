package com.ubb.modernstore.repository;

import com.ubb.modernstore.model.AuditLog;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuditRepository extends MongoRepository<AuditLog, String> {
}
