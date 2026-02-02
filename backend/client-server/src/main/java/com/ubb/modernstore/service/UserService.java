package com.ubb.modernstore.service;

import com.ubb.modernstore.exception.EntityNotFoundException;
import com.ubb.modernstore.mapper.CartItemMapper;
import com.ubb.modernstore.mapper.ProductMapper;
import com.ubb.modernstore.model.User;
import com.ubb.modernstore.model.embedded.CartItem;
import com.ubb.modernstore.openapi.model.AuditLogDto;
import com.ubb.modernstore.openapi.model.CartItemDto;
import com.ubb.modernstore.openapi.model.ProductDto;
import com.ubb.modernstore.repository.UserRepository;
import com.ubb.modernstore.service.audit.AuditPublisher;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository repository;
    private final ProductService productService;
    private final AuditPublisher auditPublisher;
    private final ProductMapper productMapper;
    private final CartItemMapper cartItemMapper;

    public List<ProductDto> getUserWishlist(String userId) {
        var user = getById(userId);
        return user.getWishlist().stream()
            .map(productMapper::mapToDto)
            .toList();
    }

    public void addProductToWishlist(String userId, String productId) {
        var user = getById(userId);
        var productDto = productService.getProductById(productId);
        var product = productMapper.mapToModel(productDto);
        var isNotInWishlist = user.getWishlist().stream()
            .noneMatch(p -> p.getId().equals(productId));

        if(isNotInWishlist) {
            user.getWishlist().add(product);
            repository.save(user);
            publishAuditLog("WISHLIST_ADD", userId, productId);
        }
    }

    public void removeProductFromWishlist(String userId, String productId) {
        var user = getById(userId);
        user.getWishlist().removeIf(p -> p.getId().equals(productId));
        repository.save(user);
        publishAuditLog("WISHLIST_REMOVE", userId, productId);
    }

    public void clearUserWishlist(String userId) {
        var user = getById(userId);
        user.setWishlist(List.of());
        repository.save(user);
        publishAuditLog("WISHLIST_CLEAR", userId, null);
    }

    public List<CartItemDto> getUserCart(String userId) {
        var user = getById(userId);
        return user.getCart().stream()
            .map(cartItemMapper::mapToDto)
            .toList();
    }

    public void addProductToCart(String userId, String productId) {
        var user = getById(userId);
        var productDto = productService.getProductById(productId);

        var existingCartItem = user.getCart().stream()
            .filter(item -> item.getProduct().getId().equals(productId))
            .findFirst();

        if (existingCartItem.isPresent()) {
            existingCartItem.get().setQuantity(existingCartItem.get().getQuantity() + 1);
        } else {
            var cartItem = cartItemMapper.mapToModel(new CartItemDto().product(productDto).quantity(1));
            user.getCart().add(cartItem);
        }

        repository.save(user);
        publishAuditLog("CART_ADD", userId, productId);
    }

    public void removeProductFromCart(String userId, String productId) {
        var user = getById(userId);

        var existingCartItem = user.getCart().stream()
            .filter(item -> item.getProduct().getId().equals(productId))
            .findFirst();

        if (existingCartItem.isPresent()) {
            var item = existingCartItem.get();

            if (item.getQuantity() > 1) {
                item.setQuantity(item.getQuantity() - 1);
            } else {
                user.setCart(List.of());
            }
        }

        repository.save(user);
        publishAuditLog("CART_REMOVE", userId, productId);
    }

    public void addNewProductToCart(String userId, String productId) {
        var user = getById(userId);
        var productDto = productService.getProductById(productId);
        var cartItem = new CartItem();

        cartItem.setProduct(productMapper.mapToModel(productDto));
        cartItem.setQuantity(1);
        user.getCart().add(cartItem);

        repository.save(user);
        publishAuditLog("CART_ADD_NEW", userId, productId);
    }

    public void clearProductFromCart(String userId, String productId) {
        var user = getById(userId);
        user.getCart().removeIf(item -> item.getProduct().getId().equals(productId));
        repository.save(user);
    }

    public void moveProductFromCartToWishlist(String userId, String productId) {
        var user = getById(userId);

        var existingCartItem = user.getCart().stream()
            .filter(item -> item.getProduct().getId().equals(productId))
            .findFirst();

        if (existingCartItem.isPresent()) {
            var product = existingCartItem.get().getProduct();
            user.getWishlist().add(product);
            user.getCart().remove(existingCartItem.get());
            repository.save(user);
        }
        publishAuditLog("CART_MOVE_TO_WISHLIST", userId, productId);
    }

    public void moveProductsFromWishlistToCart(String userId, List<ProductDto> productDtos) {
        var user = getById(userId);

        productDtos.forEach(productDto -> {
            var productId = productDto.getId();

            var existingWishlistItem = user.getWishlist().stream()
                .filter(p -> p.getId().equals(productId))
                .findFirst();

            if (existingWishlistItem.isPresent()) {
                var product = existingWishlistItem.get();

                var existingCartItem = user.getCart().stream()
                    .filter(item -> item.getProduct().getId().equals(productId))
                    .findFirst();

                if (existingCartItem.isPresent()) {
                    existingCartItem.get().setQuantity(existingCartItem.get().getQuantity() + 1);
                } else {
                    var cartItem = new CartItem();
                    cartItem.setProduct(product);
                    cartItem.setQuantity(1);
                    user.getCart().add(cartItem);
                }

                user.getWishlist().remove(product);
            }
        });

        repository.save(user);
        publishAuditLog("WISHLIST_MOVE_TO_CART", userId, null);
    }

    private User getById(String id) {
        return repository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException(User.class.getSimpleName(), id));
    }

    private void publishAuditLog(String eventType, String userId, String entityId) {
        var auditLog = new AuditLogDto();
        auditLog.setEventType(eventType);
        auditLog.setTimestamp(Instant.now().toString());
        auditLog.setUserId(userId);
        auditLog.setEntityId(entityId);

        auditPublisher.publish(auditLog);
    }
}
