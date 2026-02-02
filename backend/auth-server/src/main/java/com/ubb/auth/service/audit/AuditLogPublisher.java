package com.ubb.auth.service.audit;

import com.ubb.auth.config.RabbitConfig;
import com.ubb.modernstore.openapi.model.AuditLogDto;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuditLogPublisher {

    private final RabbitTemplate rabbitTemplate;

    public void publish(AuditLogDto auditLogDto) {
        var key = "audit." + auditLogDto.getEventType().toLowerCase();
        rabbitTemplate.convertAndSend(RabbitConfig.EXCHANGE, key, auditLogDto);
    }

}