package com.ubb.modernstore.service;

import com.ubb.modernstore.exception.EntityNotFoundException;
import com.ubb.modernstore.mapper.ProductMapper;
import com.ubb.modernstore.model.Product;
import com.ubb.modernstore.openapi.model.ProductCategoryEnum;
import com.ubb.modernstore.openapi.model.ProductDto;
import com.ubb.modernstore.repository.ProductRepository;
import io.micrometer.common.util.StringUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository repository;
    private final ProductMapper mapper;

    public List<ProductDto> getAllProductsByCategory(String category) {
        if (StringUtils.isEmpty(category)) {
            return repository.findAll().stream()
                .map(mapper::mapToDto)
                .toList();
        }

        var categoryEnum = ProductCategoryEnum.fromValue(category.toUpperCase());
        return repository.findByCategory(categoryEnum).stream()
            .map(mapper::mapToDto)
            .toList();
    }

    public ProductDto getProductById(String productId) {
        var product = getById(productId);
        return mapper.mapToDto(product);
    }

    public List<ProductDto> getProductsByIds(List<String> productIds) {
        return repository.findByIdIn(productIds).stream()
            .map(mapper::mapToDto)
            .toList();
    }

    private Product getById(String id) {
        return repository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException(Product.class.getSimpleName(), id));
    }

}
