package com.ubb.auth.model;

import com.ubb.auth.domain.UserId;
import com.ubb.auth.model.embedded.CartItem;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Document(collection = UserId.COLLECTION_NAME)
@Data
@Builder
public class User {

    @Id
    private String id;

    @Field(name = UserId.USERNAME)
    private String username;

    @Field(name = UserId.EMAIL)
    private String email;

    @Field(name = UserId.PASSWORD)
    private String password;

    @Field(name = UserId.ROLES)
    private List<String> roles;

    @Field(name = UserId.WISHLIST)
    private List<Product> wishlist;

    @Field(name = UserId.CART)
    private List<CartItem> cart;

}
