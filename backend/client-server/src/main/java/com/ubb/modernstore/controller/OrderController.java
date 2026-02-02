package com.ubb.modernstore.controller;

import com.ubb.modernstore.aspect.ApiController;
import com.ubb.modernstore.openapi.controller.OrdersApi;
import com.ubb.modernstore.openapi.model.OrderDto;
import com.ubb.modernstore.openapi.model.OrderRequestDto;
import com.ubb.modernstore.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@ApiController
@RequiredArgsConstructor
@RequestMapping("/orders")
public class OrderController implements OrdersApi {

    private final OrderService service;

    @PostMapping
    public ResponseEntity<Void> placeOrder(OrderRequestDto orderRequestDto,
                                           @AuthenticationPrincipal Jwt jwt) {
        service.addOrder(orderRequestDto, jwt.getSubject());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @Override
    public ResponseEntity<List<OrderDto>> getAllOrders() {
        return ResponseEntity.ok(service.getAllOrders());
    }

}
