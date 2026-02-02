package com.ubb.modernstore.service.audit;

import com.ubb.modernstore.mapper.AuditLogMapper;
import com.ubb.modernstore.openapi.model.AuditLogDto;
import com.ubb.modernstore.repository.AuditLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuditLogService {

    private final AuditLogRepository repository;
    private final AuditLogMapper mapper;

    public List<AuditLogDto> getAllAuditLogs() {
        return repository.findAll().stream()
            .map(mapper::mapToDto)
            .toList();
    }

}
