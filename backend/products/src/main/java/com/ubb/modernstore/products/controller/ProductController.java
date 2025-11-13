package com.ubb.modernstore.products.controller;

import com.ubb.modernstore.products.aspect.ApiController;
import com.ubb.modernstore.products.openapi.controller.ProductsApi;
import com.ubb.modernstore.products.openapi.model.ProductDto;
import com.ubb.modernstore.products.service.ProductService;
import lombok.RequiredArgsConstructor;
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

}
