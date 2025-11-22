package com.ubb.modernstore.wishlist.service;

import com.ubb.modernstore.wishlist.openapi.model.ProductDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;

@Service
@RequiredArgsConstructor
@Log4j2
public class ProductsApiService {

    private static final String PRODUCTS_API_URL = "http://localhost:8080/api/products";

    private final RestClient productsRestClient;

    public List<ProductDto> getProductsByIds(List<String> productIds) {
        log.info(() -> "Fetching products for IDs: " + productIds);
        return productsRestClient.post()
            .uri(PRODUCTS_API_URL + "/find-by-ids")
            .contentType(MediaType.APPLICATION_JSON)
            .body(productIds)
            .retrieve()
            .body(new ParameterizedTypeReference<>() {});

    }

}

