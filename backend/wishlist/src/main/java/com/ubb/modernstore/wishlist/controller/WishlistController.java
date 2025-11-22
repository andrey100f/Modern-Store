package com.ubb.modernstore.wishlist.controller;

import com.ubb.modernstore.common.aspect.ApiController;
import com.ubb.modernstore.wishlist.openapi.controller.WishlistApi;
import com.ubb.modernstore.wishlist.openapi.model.ProductDto;
import com.ubb.modernstore.wishlist.openapi.model.WishlistRequestDto;
import com.ubb.modernstore.wishlist.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@ApiController
@RequiredArgsConstructor
public class WishlistController implements WishlistApi {

    private final WishlistService service;

    @Override
    public ResponseEntity<List<ProductDto>> getAllProductsFromWishlist(String userId) {
        return ResponseEntity.ok(service.getWishlistProducts(userId));
    }

    @Override
    public ResponseEntity<Void> addProductToWishlist(WishlistRequestDto wishlistRequestDto) {
        service.addProductToWishlist(wishlistRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @Override
    public ResponseEntity<Void> removeProductFromWishlist(WishlistRequestDto wishlistRequestDto) {
        service.removeProductFromWishlist(wishlistRequestDto);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
