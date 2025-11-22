package com.ubb.modernstore.wishlist.service;

import com.ubb.modernstore.wishlist.entity.Wishlist;
import com.ubb.modernstore.wishlist.openapi.model.ProductDto;
import com.ubb.modernstore.wishlist.repository.WishlistRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
@Log4j2
public class WishlistService {

    private final WishlistRepository repository;
    private final ProductsApiService productsApiService;

    public List<ProductDto> getWishlistProducts(String userId) {
        var productIds = getProductIdsByUserId(userId);

        if (CollectionUtils.isEmpty(productIds)) {
            log.info(() -> "No wishlist products found for userId " + userId);
            return Collections.emptyList();
        }

        return productsApiService.getProductsByIds(productIds);
    }

    private List<String> getProductIdsByUserId(String userId) {
        return repository.findByUserId(userId).stream()
            .map(Wishlist::getProductId)
            .toList();
    }

}
