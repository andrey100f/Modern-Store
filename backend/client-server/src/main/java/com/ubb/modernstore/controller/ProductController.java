package com.ubb.modernstore.controller;

import com.ubb.modernstore.aspect.ApiController;
import com.ubb.modernstore.openapi.controller.ProductsApi;
import com.ubb.modernstore.openapi.model.ProductDto;
import com.ubb.modernstore.openapi.model.ProductRequestDto;
import com.ubb.modernstore.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

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

    @Override
    public ResponseEntity<Void> createProduct(ProductRequestDto productDto) {
        service.createProduct(productDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @Override
    public ResponseEntity<Void> deleteProduct(String id) {
        service.deleteProduct(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @Override
    public ResponseEntity<ProductDto> updateProduct(String id, ProductRequestDto productRequestDto) {
        return ResponseEntity.ok(service.updateProduct(id, productRequestDto));
    }

}

