package com.ubb.modernstore.controller;

import com.ubb.modernstore.openapi.model.OrderDto;
import com.ubb.modernstore.openapi.model.OrderRequestDto;
import com.ubb.modernstore.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService service;

    @PostMapping
    public ResponseEntity<Void> placeOrder(@RequestBody OrderRequestDto orderRequestDto,
                                           @AuthenticationPrincipal Jwt jwt) {
        service.addOrder(orderRequestDto, jwt.getSubject());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping
    public ResponseEntity<List<OrderDto>> getAllOrders() {
        return ResponseEntity.ok(service.getAllOrders());
    }

}
