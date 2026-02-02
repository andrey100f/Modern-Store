package com.ubb.modernstore.service.audit;

import com.ubb.modernstore.config.RabbitConfig;
import com.ubb.modernstore.mapper.AuditLogMapper;
import com.ubb.modernstore.openapi.model.AuditLogDto;
import com.ubb.modernstore.repository.AuditRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuditConsumer {

    private final AuditRepository auditRepository;
    private final AuditLogMapper auditLogMapper;

    @RabbitListener(queues = RabbitConfig.QUEUE)
    public void handle(AuditLogDto auditLogDto) {
        var auditLog = auditLogMapper.mapToModel(auditLogDto);
        auditRepository.save(auditLog);
    }

}
