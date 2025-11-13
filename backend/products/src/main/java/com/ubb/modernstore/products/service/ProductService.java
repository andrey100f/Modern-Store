package com.ubb.modernstore.products.service;

import com.ubb.modernstore.products.mapper.ProductMapper;
import com.ubb.modernstore.products.openapi.model.ProductCategoryEnum;
import com.ubb.modernstore.products.openapi.model.ProductDto;
import com.ubb.modernstore.products.repository.ProductRepository;
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

}
