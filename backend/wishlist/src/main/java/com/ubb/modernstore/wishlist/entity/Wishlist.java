package com.ubb.modernstore.wishlist.entity;

import com.ubb.modernstore.wishlist.domain.WishlistId;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Table(name = WishlistId.COLLECTION_NAME)
@Entity
@Data
public class Wishlist {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = WishlistId.USER_ID)
    private String userId;

    @Column(name = WishlistId.PRODUCT_ID)
    private String productId;

}
