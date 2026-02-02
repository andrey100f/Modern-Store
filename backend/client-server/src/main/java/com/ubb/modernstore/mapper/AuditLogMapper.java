package com.ubb.modernstore.mapper;

import com.ubb.modernstore.model.AuditLog;
import com.ubb.modernstore.openapi.model.AuditLogDto;
import org.mapstruct.Mapper;

@Mapper
public interface AuditLogMapper {

    AuditLog mapToModel(AuditLogDto auditLogDto);

}
