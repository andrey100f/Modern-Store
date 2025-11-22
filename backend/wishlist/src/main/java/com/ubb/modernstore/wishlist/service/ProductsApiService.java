package com.ubb.modernstore.wishlist.service;

import com.ubb.modernstore.wishlist.openapi.model.ProductDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;

@Service
@RequiredArgsConstructor
@Log4j2
public class ProductsApiService {

    @Value("${modernstore.products.base-url}")
    private String productsApiBaseUrl;

    private final RestClient productsRestClient;

    public List<ProductDto> getProductsByIds(List<String> productIds) {
        log.info(() -> "Fetching products for IDs: " + productIds);
        return productsRestClient.post()
            .uri(productsApiBaseUrl + "/find-by-ids")
            .contentType(MediaType.APPLICATION_JSON)
            .body(productIds)
            .retrieve()
            .body(new ParameterizedTypeReference<>() {});

    }

}

