package com.ubb.modernstore.service;

import com.ubb.modernstore.mapper.OrderMapper;
import com.ubb.modernstore.model.Order;
import com.ubb.modernstore.openapi.model.AuditLogDto;
import com.ubb.modernstore.openapi.model.OrderDto;
import com.ubb.modernstore.openapi.model.OrderRequestDto;
import com.ubb.modernstore.repository.OrderRepository;
import com.ubb.modernstore.service.audit.AuditPublisher;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository repository;
    private final AuditPublisher auditPublisher;
    private final OrderMapper mapper;

    public void addOrder(OrderRequestDto requestDto, String userId) {
        var order = mapper.mapFromRequestDtoToModel(requestDto);
        order.setUserId(userId);

        var savedOrder = repository.save(order);
        publishAuditLog("ORDER_PLACED", userId, savedOrder.getId());
    }

    public List<OrderDto> getAllOrders() {
        return repository.findAll().stream()
            .map(mapper::mapToDto)
            .toList();
    }

    private void publishAuditLog(String eventType, String userId, String entityId) {
        var auditLog = new AuditLogDto();
        auditLog.setEventType(eventType);
        auditLog.setTimestamp(Instant.now().toString());
        auditLog.setUserId(userId);
        auditLog.setEntityId(entityId);
        auditLog.setEntityType(Order.class.getSimpleName());

        auditPublisher.publish(auditLog);
    }

}
