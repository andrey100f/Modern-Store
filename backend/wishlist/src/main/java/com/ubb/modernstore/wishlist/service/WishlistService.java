package com.ubb.modernstore.wishlist.service;

import com.ubb.modernstore.common.exception.EntityNotFoundException;
import com.ubb.modernstore.wishlist.entity.Wishlist;
import com.ubb.modernstore.wishlist.mapper.WishlistMapper;
import com.ubb.modernstore.wishlist.openapi.model.ProductDto;
import com.ubb.modernstore.wishlist.openapi.model.WishlistRequestDto;
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
    private final WishlistMapper mapper;
    private final ProductsApiService productsApiService;

    public List<ProductDto> getWishlistProducts(String userId) {
        var productIds = getProductIdsByUserId(userId);

        if (CollectionUtils.isEmpty(productIds)) {
            log.info(() -> "No wishlist products found for userId " + userId);
            return Collections.emptyList();
        }

        return productsApiService.getProductsByIds(productIds);
    }

    public void addProductToWishlist(WishlistRequestDto requestDto) {
        var wishlist = mapper.mapFromRequestDtoToEntity(requestDto);
        repository.save(wishlist);
        log.info(() -> "Added productId " + requestDto.getProductId() + " to wishlist for userId " + requestDto.getUserId());
    }

    public void removeProductFromWishlist(WishlistRequestDto requestDto) {
        var wishlist = getByUserIdAndProductId(requestDto.getUserId(), requestDto.getProductId());
        repository.delete(wishlist);
        log.info(() -> "Removed productId " + requestDto.getProductId() + " from wishlist for userId " + requestDto.getUserId());
    }

    private List<String> getProductIdsByUserId(String userId) {
        return repository.findByUserId(userId).stream()
            .map(Wishlist::getProductId)
            .toList();
    }

    private Wishlist getByUserIdAndProductId(String userId, String productId) {
        var errorMessageParam = String.format("userId: %s, productId: %s", userId, productId);
        return repository.findByUserIdAndProductId(userId, productId)
            .orElseThrow(() -> new EntityNotFoundException(Wishlist.class.getSimpleName(), errorMessageParam));
    }

}
