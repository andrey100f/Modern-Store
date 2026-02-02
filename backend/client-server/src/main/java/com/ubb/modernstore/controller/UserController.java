package com.ubb.modernstore.controller;

import com.ubb.modernstore.openapi.model.CartItemDto;
import com.ubb.modernstore.openapi.model.ProductDto;
import com.ubb.modernstore.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    private final UserService service;

    @GetMapping("/cart")
    public ResponseEntity<List<CartItemDto>> getUserCart(@AuthenticationPrincipal Jwt jwt) {
        return ResponseEntity.ok(service.getUserCart(jwt.getSubject()));
    }

    @PostMapping("/cart/{productId}")
    public ResponseEntity<Void> addItemToUserCart(@AuthenticationPrincipal Jwt jwt,
                                                  @PathVariable String productId) {
        service.addProductToCart(jwt.getSubject(), productId);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/cart/{productId}")
    public ResponseEntity<Void> removeItemFromUserCart(@AuthenticationPrincipal Jwt jwt,
                                                       @PathVariable String productId) {
        service.removeProductFromCart(jwt.getSubject(), productId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/cart/{productId}/add")
    public ResponseEntity<Void> addNewProductToCart(@AuthenticationPrincipal Jwt jwt,
                                                    @PathVariable String productId,
                                                    @RequestParam Integer quantity) {
        service.addNewProductToCart(jwt.getSubject(), productId, quantity);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/cart/{productId}/clear")
    public ResponseEntity<Void> clearUserCartItem(@AuthenticationPrincipal Jwt jwt,
                                                  @PathVariable String productId) {
        service.clearProductFromCart(jwt.getSubject(), productId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/wishlist")
    public ResponseEntity<List<ProductDto>> getUserWishlist(@AuthenticationPrincipal Jwt jwt) {
        return ResponseEntity.ok(service.getUserWishlist(jwt.getSubject()));
    }

    @PostMapping("/wishlist/{productId}")
    public ResponseEntity<Void> addItemToUserWishlist(@AuthenticationPrincipal Jwt jwt,
                                                      @PathVariable String productId) {
        service.addProductToWishlist(jwt.getSubject(), productId);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/wishlist/clear")
    public ResponseEntity<Void> clearUserWishlist(@AuthenticationPrincipal Jwt jwt) {
        service.clearUserWishlist(jwt.getSubject());
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/wishlist/{productId}")
    public ResponseEntity<Void> removeItemFromUserWishlist(@AuthenticationPrincipal Jwt jwt,
                                                           @PathVariable String productId) {
        service.removeProductFromWishlist(jwt.getSubject(), productId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/cart/{productId}/move-to-wishlist")
    public ResponseEntity<Void> moveItemFromCartToWishlist(@AuthenticationPrincipal Jwt jwt,
                                                           @PathVariable String productId) {
        service.moveProductFromCartToWishlist(jwt.getSubject(), productId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PutMapping("/wishlist/move-to-cart")
    public ResponseEntity<Void> moveItemsFromWishlistToCart(@AuthenticationPrincipal Jwt jwt,
                                                            @RequestBody List<ProductDto> productDto) {
        service.moveProductsFromWishlistToCart(jwt.getSubject(), productDto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
