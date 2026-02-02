package com.ubb.auth.model.embedded;

import com.ubb.auth.domain.CartItemId;
import com.ubb.auth.model.Product;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
public class CartItem {

    @Field(name = CartItemId.PRODUCT)
    private Product product;

    @Field(name = CartItemId.QUANTITY)
    private Integer quantity;

}
