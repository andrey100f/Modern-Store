package com.ubb.auth.service.audit;

import com.ubb.auth.config.RabbitConfig;
import com.ubb.auth.model.AuditLog;
import com.ubb.auth.repository.AuditLogRepository;
import com.ubb.modernstore.openapi.model.AuditLogDto;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuditLogConsumer {

    private final AuditLogRepository auditRepository;

    @RabbitListener(queues = RabbitConfig.QUEUE)
    public void handle(AuditLogDto auditLogDto) {
        var auditLog = AuditLog.builder()
                .id(auditLogDto.getId())
                .eventType(auditLogDto.getEventType())
                .entityType(auditLogDto.getEntityType())
                .timestamp(auditLogDto.getTimestamp())
                .userId(auditLogDto.getUserId())
                .entityId(auditLogDto.getEntityId())
                .build();
        auditRepository.save(auditLog);
    }

}
