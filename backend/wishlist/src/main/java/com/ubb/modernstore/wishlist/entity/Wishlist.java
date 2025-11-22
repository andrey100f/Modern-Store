package com.ubb.modernstore.wishlist.entity;

import com.ubb.modernstore.wishlist.domain.WishlistId;
import jakarta.persistence.*;
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
