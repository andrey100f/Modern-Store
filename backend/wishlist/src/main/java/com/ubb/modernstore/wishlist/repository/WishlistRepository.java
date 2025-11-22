package com.ubb.modernstore.wishlist.repository;

import com.ubb.modernstore.wishlist.entity.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WishlistRepository extends JpaRepository<Wishlist, String> {

    List<Wishlist> findByUserId(String userId);
    Optional<Wishlist> findByUserIdAndProductId(String userId, String productId);

}
