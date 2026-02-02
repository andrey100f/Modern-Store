package com.ubb.modernstore.controller;

import com.ubb.modernstore.aspect.ApiController;
import com.ubb.modernstore.openapi.controller.ProductsApi;
import com.ubb.modernstore.openapi.model.ProductDto;
import com.ubb.modernstore.openapi.model.ProductRequestDto;
import com.ubb.modernstore.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@ApiController
@RequiredArgsConstructor
public class ProductController implements ProductsApi {

    private final ProductService service;

    @Override
    public ResponseEntity<List<ProductDto>> getAllProducts(String category) {
        return ResponseEntity.ok(service.getAllProductsByCategory(category));
    }

    @Override
    public ResponseEntity<ProductDto> getProductById(String id) {
        return ResponseEntity.ok(service.getProductById(id));
    }

    @Override
    public ResponseEntity<List<ProductDto>> getProductsByIds(List<String> ids) {
        return ResponseEntity.ok(service.getProductsByIds(ids));
    }

    @PostMapping
    public ResponseEntity<Void> createProduct(@AuthenticationPrincipal Jwt jwt, @RequestBody ProductRequestDto productDto) {
        service.createProduct(jwt.getSubject(), productDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@AuthenticationPrincipal Jwt jwt, @PathVariable String id) {
        service.deleteProduct(jwt.getSubject(), id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDto> updateProduct(@AuthenticationPrincipal Jwt jwt,
                                                    @PathVariable String id,
                                                    @RequestBody ProductRequestDto productRequestDto) {
        return ResponseEntity.ok(service.updateProduct(jwt.getSubject(), id, productRequestDto));
    }

}

