package com.ubb.modernstore.service;

import com.ubb.modernstore.mapper.OrderMapper;
import com.ubb.modernstore.openapi.model.OrderRequestDto;
import com.ubb.modernstore.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository repository;
    private final OrderMapper mapper;

    public void addOrder(OrderRequestDto requestDto, String userId) {
        var order = mapper.mapFromRequestDtoToModel(requestDto);
        order.setUserId(userId);

        repository.save(order);
    }

}
