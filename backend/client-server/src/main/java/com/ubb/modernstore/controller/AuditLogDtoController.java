package com.ubb.modernstore.controller;

import com.ubb.modernstore.aspect.ApiController;
import com.ubb.modernstore.openapi.controller.AuditLogsApi;
import com.ubb.modernstore.openapi.model.AuditLogDto;
import com.ubb.modernstore.service.audit.AuditLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;

import java.util.List;

@ApiController
@RequiredArgsConstructor
public class AuditLogDtoController implements AuditLogsApi {

    private final AuditLogService service;

    @Override
    public ResponseEntity<List<AuditLogDto>> getAuditLogs() {
        return ResponseEntity.ok(service.getAllAuditLogs());
    }

}
