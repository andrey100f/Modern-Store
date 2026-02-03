package com.ubb.modernstore.service;

import com.ubb.modernstore.exception.EntityNotFoundException;
import com.ubb.modernstore.mapper.ProductMapper;
import com.ubb.modernstore.model.Product;
import com.ubb.modernstore.openapi.model.AuditLogDto;
import com.ubb.modernstore.openapi.model.ProductCategoryEnum;
import com.ubb.modernstore.openapi.model.ProductDto;
import com.ubb.modernstore.openapi.model.ProductRequestDto;
import com.ubb.modernstore.repository.ProductRepository;
import com.ubb.modernstore.service.audit.AuditPublisher;
import io.micrometer.common.util.StringUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository repository;
    private final AuditPublisher auditPublisher;
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

    public void createProduct(String userId, ProductRequestDto productDto) {
        var product = mapper.mapFromRequestDtoToModel(productDto);
        var savedProduct = repository.save(product);

        publishAuditLog("PRODUCT_CREATED", userId, savedProduct.getId());
    }

    public ProductDto updateProduct(String userId, String id, ProductRequestDto productRequestDto) {
        var existingProduct = getById(id);
        var updatedProduct = mapper.mapFromRequestDtoToModel(productRequestDto);

        updatedProduct.setId(existingProduct.getId());
        var savedProduct = repository.save(updatedProduct);

        publishAuditLog("PRODUCT_DELETED", userId, savedProduct.getId());
        return mapper.mapToDto(savedProduct);
    }

    public void deleteProduct(String userId, String id) {
        var product = getById(id);
        repository.delete(product);
        publishAuditLog("PRODUCT_DELETED", userId, id);
    }

    public Integer getProductCount() {
        return Long.valueOf(repository.count()).intValue();
    }

    private Product getById(String id) {
        return repository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException(Product.class.getSimpleName(), id));
    }

    private void publishAuditLog(String eventType, String userId, String entityId) {
        var auditLog = new AuditLogDto();
        auditLog.setEventType(eventType);
        auditLog.setTimestamp(Instant.now().toString());
        auditLog.setUserId(userId);
        auditLog.setEntityId(entityId);
        auditLog.setEntityType(Product.class.getSimpleName());

        auditPublisher.publish(auditLog);
    }

}
