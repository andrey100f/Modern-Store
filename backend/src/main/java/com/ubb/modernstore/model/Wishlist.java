package com.ubb.modernstore.model;

import com.ubb.modernstore.domain.WishlistId;
import lombok.Data;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = WishlistId.COLLECTION_NAME)
@Data
public class Wishlist {

    @Id
    private String id;

    @Field(name = WishlistId.USER_ID)
    private String userId;

    @Field(name = WishlistId.PRODUCT_ID)
    private String productId;

}