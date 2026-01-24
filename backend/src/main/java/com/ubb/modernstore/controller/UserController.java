package com.ubb.modernstore.controller;

import com.ubb.modernstore.aspect.ApiController;
import com.ubb.modernstore.openapi.controller.UsersApi;
import com.ubb.modernstore.openapi.model.CartItemDto;
import com.ubb.modernstore.openapi.model.ProductDto;
import com.ubb.modernstore.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@ApiController
@RequiredArgsConstructor
public class UserController implements UsersApi {

    private final UserService service;

    @Override
    public ResponseEntity<List<CartItemDto>> getUserCart(String userId) {
        return ResponseEntity.ok(service.getUserCart(userId));
    }

    @Override
    public ResponseEntity<Void> addItemToUserCart(String userId, String productId) {
        service.addProductToCart(userId, productId);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @Override
    public ResponseEntity<List<ProductDto>> getUserWishlist(String userId) {
        return ResponseEntity.ok(service.getUserWishlist(userId));
    }

}
