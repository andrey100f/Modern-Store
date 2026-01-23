package com.ubb.modernstore.repository;

import com.ubb.modernstore.model.Wishlist;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WishlistRepository extends MongoRepository<Wishlist, String> {

    List<Wishlist> findByUserId(String userId);
    Optional<Wishlist> findByUserIdAndProductId(String userId, String productId);

}
