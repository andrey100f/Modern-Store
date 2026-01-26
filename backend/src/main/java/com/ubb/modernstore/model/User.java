package com.ubb.modernstore.model;

import com.ubb.modernstore.domain.UserId;
import com.ubb.modernstore.model.embedded.CartItem;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Document(collection = UserId.COLLECTION_NAME)
@Data
public class User {

    @Id
    private String id;

    @Field(name = UserId.USERNAME)
    private String username;

    @Field(name = UserId.EMAIL)
    private String email;

    @Field(name = UserId.PASSWORD)
    private String password;

    @Field(name = UserId.WISHLIST)
    private List<Product> wishlist;

    @Field(name = UserId.CART)
    private List<CartItem> cart;

}
